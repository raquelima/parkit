import { faker } from "@faker-js/faker";

function generateUser() {
  return {
    id: faker.datatype.uuid(),
    created_at: faker.date.past(),
    created_by: faker.datatype.uuid(),
    updated_at: faker.date.past(),
    updated_by: faker.datatype.uuid(),
    okta_id: faker.datatype.uuid(),
    disabled: false,
    email: faker.internet.email(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    preferred_language: faker.random.locale(),
    role: faker.helpers.arrayElement(["admin", "user"]),
    username: faker.internet.userName(),
  };
}

const usersWithoutTestUser = [generateUser(), generateUser()];
const testUser = {
  ...generateUser(),
  id: Buffer.from("test@adobe.com").toString("base64"),
  email: "test@adobe.com",
  first_name: "Test",
  last_name: "User",
  role: "user",
  username: "test@adobe.com",
};

export const users = [...usersWithoutTestUser, testUser];

function generateParkingSpot(number) {
  return {
    id: faker.datatype.uuid(),
    created_at: faker.date.past(),
    created_by: faker.datatype.uuid(),
    updated_at: faker.date.past(),
    updated_by: faker.datatype.uuid(),
    number,
    charger_available: faker.datatype.boolean(),
    unavailable: faker.datatype.boolean(),
    unavailability_reason: faker.random.words(),
  };
}

export const parkingSpots = [...Array(8).keys()].map((i) =>
  generateParkingSpot(i + 42)
);

function generateVehicle(user = null) {
  if (!user) {
    user = faker.helpers.arrayElement(users);
  }

  return {
    id: faker.datatype.uuid(),
    created_at: faker.date.past(),
    created_by: faker.datatype.uuid(),
    updated_at: faker.date.past(),
    updated_by: faker.datatype.uuid(),
    user_id: user.id,
    ev: faker.datatype.boolean(),
    license_plate_number: faker.vehicle.vin(),
    make: faker.vehicle.manufacturer(),
    model: faker.vehicle.model(),
    vehicle_type: "car",
  };
}

const testUserVehicle = generateVehicle(testUser);

export const vehicles = [
  ...[...Array(4).keys()].map(() => generateVehicle()),
  testUserVehicle,
];

function generateReservation(user = null, vehicle = null) {
  const date = new Date(faker.date.soon(10).toISOString());

  const startTime = new Date(date);
  const endTime = new Date(date);

  const halfDay = faker.datatype.boolean();
  const am = faker.datatype.boolean();

  startTime.setHours(0, 0, 0, 0);
  endTime.setHours(23, 59, 59, 999);
  if (halfDay) {
    if (am) {
      endTime.setHours(11, 59, 59, 999);
    } else {
      startTime.setHours(12, 0, 0, 0);
    }
  }

  if (!user) {
    user = faker.helpers.arrayElement(usersWithoutTestUser);
  }

  if (!vehicle) {
    vehicle = faker.helpers.arrayElement(vehicles);
  }

  return {
    id: faker.datatype.uuid(),
    created_at: faker.date.past(),
    created_by: user.id,
    updated_at: faker.date.past(),
    updated_by: faker.datatype.uuid(),
    parking_spot_id: faker.helpers.arrayElement(parkingSpots).id,
    user_id: user.id,
    vehicle_id: vehicle.id,
    cancelled: false,
    date: date.toISOString().split("T")[0],
    start_time: startTime.toISOString(),
    end_time: endTime.toISOString(),
    half_day: halfDay,
    am,
    cancelled_at: null,
    cancelled_by: null,
    vehicle: vehicle,
  };
}

export const reservations = [
  generateReservation(testUser, testUserVehicle),
  generateReservation(),
  generateReservation(),
];
