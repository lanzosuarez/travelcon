import { faker } from "@faker-js/faker";
import { Event } from "./types";

const newEvent = (): Event => ({
  name: faker.address.city(),
  location: faker.address.cityName(),
  schedules: faker.datatype.number(20),
  guests: faker.datatype.number(200),
  totalEarnings: faker.datatype.number(30000),
  reviews: faker.datatype.number(100),
  rating: faker.datatype.number(5),
  status: faker.helpers.shuffle<Event["status"]>(["active", "inactive"])[0],
});

export const makeData = (lenght: number): Event[] =>
  [...new Array(lenght)].map(() => newEvent());
