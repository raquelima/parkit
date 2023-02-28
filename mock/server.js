import { setupServer } from "msw/node";
import { rest } from "msw";
import { OpenAPIBackend } from "openapi-backend";
import path, { dirname } from "path";
import { fileURLToPath } from "node:url";
import { developmentBaseUrl } from "./conf.js";
import { parkingSpots, reservations, users, vehicles } from "./data.js";
import { faker } from "@faker-js/faker";

const __dirname = dirname(fileURLToPath(import.meta.url));

const api = new OpenAPIBackend({
  definition: path.join(
    __dirname,
    "..",
    "node_modules",
    "@berufsbildung-basel",
    "parkit-spec",
    "api.yml"
  ),
});

api.register("notFound", (c, res, ctx) => {
  return res(ctx.status(404));
});

function sendMockResponse(operationId, res, ctx) {
  const { status, mock } = api.mockResponseForOperation(operationId);
  ctx.status(status);
  return res(ctx.json(mock));
}

function sendListResponse(list, fieldName, res, ctx) {
  ctx.status(200);
  return res(
    ctx.json({
      limit_per_page: 100,
      total_count: list.length,
      current_page: 1,
      total_pages: 1,
      [fieldName]: list,
    })
  );
}

api.register("notImplemented", async (c, res, ctx) => {
  const mockStatusCode = c.request.headers["x-test-response-code"];
  const mockStatusText = c.request.headers["x-test-response-text"];

  if (mockStatusCode) {
    return res(ctx.status(mockStatusCode, mockStatusText));
  }

  return sendMockResponse(c.operation.operationId, res, ctx);
});

api.register("validationFail", (c, res, ctx) => {
  ctx.text(c.validation.errors.join(", "));
  return res(
    ctx.status(
      400,
      c.validation.errors.map((e) => JSON.stringify(e)).join(", ")
    )
  );
});

api.registerSecurityHandler("BasicAuth", (c) => {
  return (
    c.request.headers["authorization"] ===
    `Basic ${new Buffer("test@adobe.com:testPassword").toString("base64")}`
  );
});

api.register("unauthorizedHandler", (c, res, ctx) => {
  return res(ctx.status(401, "unauthorized"));
});

//User Endpoints
api.register({
  listUsers: (c, res, ctx) => {
    const { status, mock } = api.mockResponseForOperation(
      c.operation.operationId
    );
    if (c.request.headers["x-test-empty-response"]) {
      ctx.status(200);
      return res(ctx.json([]));
    } else {
      const returnObject = {
        ...mock,
        users: [...mock.users, ...users],
      };
      return res(ctx.json(returnObject));
    }
  },
  getUser: (c, res, ctx) => {
    const id = c.request.params.id;
    const user = users.find((user) => user.id === id);

    if (user) {
      ctx.status(200);
      return res(ctx.json(user));
    } else {
      return res(ctx.status(404));
    }
  },
});

//Parking Spot Endpoints
api.register({
  listParkingSpots: (c, res, ctx) => {
    if (c.request.headers["x-test-empty-response"]) {
      ctx.status(200);
      return res(ctx.json([]));
    } else {
      //send array
      return sendListResponse(parkingSpots, "parking_spots", res, ctx);
    }
  },
  checkParkingSpotAvailability: (c, res, ctx) => {
    const isHalfDay = c.request.query.half_day === "true";
    const isMorning = isHalfDay && c.request.query.am === "true";

    const startTime = new Date(Date.parse(c.request.query.date));
    const endTime = new Date(Date.parse(c.request.query.date));

    startTime.setHours(isMorning || !isHalfDay ? 0 : 12, 0, 0, 0);

    endTime.setHours(isMorning ? 11 : 23, 59, 59, 999);

    const availableParkingSpots = parkingSpots.filter(
      (parkingSpot) =>
        reservations
          .filter(
            (reservation) => reservation.parking_spot_id === parkingSpot.id
          )
          .filter((reservation) => {
            const reservationStartTime = new Date(
              Date.parse(reservation.start_time)
            );
            const reservationEndTime = new Date(
              Date.parse(reservation.end_time)
            );

            // check if reservation overlaps with start and end time
            return (
              (startTime >= reservationStartTime &&
                startTime <= reservationEndTime) ||
              (endTime >= reservationStartTime &&
                endTime <= reservationEndTime) ||
              (startTime <= reservationStartTime &&
                endTime >= reservationEndTime)
            );
          }).length === 0
    );

    ctx.status(200);
    return res(
      ctx.json({
        available_parking_spots: availableParkingSpots,
      })
    );
  },
  listParkingSpotsToday: (c, res, ctx) => {
    const enrichedParkingSpots = parkingSpots.map((parkingSpot) => {
      const reservationsToday = reservations.filter(
        (reservation) =>
          reservation.parking_spot_id === parkingSpot.id &&
          reservation.date === new Date(Date.now()).toISOString().split("T")[0]
      );

      return {
        ...parkingSpot,
        reservations: reservationsToday,
      };
    });

    ctx.status(200);

    if (c.request.headers["x-test-empty-response"]) {
      return res(ctx.json({ parkingSpots: [] }));
    } else {
      return res(ctx.json({ parkingSpots: enrichedParkingSpots }));
    }
  },
});

//Reservation Endpoints
api.register({
  listReservations: (c, res, ctx) => {
    if (c.request.headers["x-test-empty-response"]) {
      ctx.status(200);
      return res(ctx.json([]));
    } else {
      return sendListResponse(reservations, "reservations", res, ctx);
    }
  },
  createReservation: (c, res, ctx) => {
    const vehicle = vehicles.find(
      (vehicle) => vehicle.id === c.request.body.vehicle_id
    );

    if (c.request.headers["x-test-too-many-reservations"]) {
      return res(ctx.status(409, "Conflict"));
    }

    const date = c.request.body.date;

    const startTime = new Date(date);
    const endTime = new Date(date);

    const halfDay = c.request.body.half_day ?? false;
    const am = c.request.body.am;

    startTime.setHours(0, 0, 0, 0);
    endTime.setHours(23, 59, 59, 999);
    if (halfDay) {
      if (am) {
        endTime.setHours(11, 59, 59, 999);
      } else {
        startTime.setHours(12, 0, 0, 0);
      }
    }

    reservations.push({
      id: faker.datatype.uuid(),
      created_at: new Date(Date.now()),
      created_by: c.request.body.user_id,
      parking_spot_id: c.request.body.parking_spot_id,
      user_id: c.request.body.user_id,
      vehicle_id: c.request.body.vehicle_id,
      cancelled: false,
      date: date,
      start_time: startTime,
      end_time: endTime,
      half_day: halfDay,
      am: am,
      vehicle: vehicle,
    });
    return res(ctx.status(201));
  },
  cancelReservation: (c, res, ctx) => {
    const id = c.request.params.id;
    const index = reservations.findIndex(
      (reservation) => reservation.id === id
    );

    if (index !== -1) {
      reservations[index].cancelled = true;
      reservations[index]["cancelled_at"] = new Date(Date.now());
      reservations[index]["cancelled_by"] = faker.datatype.uuid();
      return res(ctx.status(200));
    } else {
      return res(ctx.status(404));
    }
  },
});

//Vehicle Endpoints
api.register({
  listVehicles: (c, res, ctx) => {
    if (c.request.headers["x-test-empty-response"]) {
      ctx.status(200);
      return res(ctx.json([]));
    } else {
      return sendListResponse(vehicles, "vehicles", res, ctx);
    }
  },
  createVehicle: (c, res, ctx) => {
    vehicles.push({
      ...c.request.body,
      id: faker.datatype.uuid(),
    });
    return res(ctx.status(200));
  },
  removeVehicle: (c, res, ctx) => {
    const id = c.request.params.id;
    const index = vehicles.findIndex((vehicle) => vehicle.id === id);

    if (index !== -1) {
      vehicles.splice(index, 1);
      return res(ctx.status(200));
    } else {
      return res(ctx.status(404));
    }
  },
});

export function setupMockServer() {
  console.log("using mock server");
  const mockServer = setupServer(
    rest.all(`${developmentBaseUrl}/*`, async (req, res, ctx) => {
      const rawHeaders = req.headers.raw();
      return api.handleRequest(
        {
          path: req.url.pathname.replace(/^\/api/, ""),
          query: req.url.search,
          method: req.method,
          body:
            rawHeaders["content-type"] === "application/json"
              ? await req.json()
              : null,
          headers: rawHeaders,
        },
        res,
        ctx
      );
    })
  );
  mockServer.listen();
  mockServer.printHandlers();
  return mockServer;
}
