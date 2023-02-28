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

export const users = [generateUser(), generateUser()];

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
  generateParkingSpot(i + 1)
);

function generateVehicle() {
  return {
    id: faker.datatype.uuid(),
    created_at: faker.date.past(),
    created_by: faker.datatype.uuid(),
    updated_at: faker.date.past(),
    updated_by: faker.datatype.uuid(),
    user_id: faker.helpers.arrayElement(users).id,
    ev: faker.datatype.boolean(),
    license_plate_number: faker.vehicle.vin(),
    make: faker.vehicle.manufacturer(),
    model: faker.vehicle.model(),
    vehicle_type: "car",
  };
}

export const vehicles = [...Array(8).keys()].map(() => generateVehicle());

function generateReservation() {
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

  return {
    id: faker.datatype.uuid(),
    created_at: faker.date.past(),
    created_by: faker.datatype.uuid(),
    updated_at: faker.date.past(),
    updated_by: faker.datatype.uuid(),
    parking_spot_id: faker.helpers.arrayElement(parkingSpots).id,
    user_id: faker.helpers.arrayElement(users).id,
    vehicle_id: faker.helpers.arrayElement(vehicles).id,
    cancelled: faker.datatype.boolean(),
    date,
    start_time: new Date(date).setHours(0, 0, 0, 0),
    end_time: new Date(date).setHours(0, 0, 0, 0),
    half_day: halfDay,
    am,
    cancelled_at: null,
    cancelled_by: null,
    vehicle: faker.helpers.arrayElement(vehicles),
  };
}

export const reservations = [generateReservation(), generateReservation()];
