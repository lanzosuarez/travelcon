import { faker } from '@faker-js/faker';
import { EventSchedule } from './types';

const newEvent = (): EventSchedule => ({
  id: faker.datatype.uuid(),
  eventName: faker.address.city(),
  schedule: 'Oct 09 - Oct 12',
  booked: faker.datatype.number(200),
  totalEarnings: faker.datatype.number(30000),
  paid: faker.datatype.number(100),
  toCollect: faker.datatype.number(30000),
  status: faker.helpers.shuffle<EventSchedule['status']>(['completed', 'ongoing', 'open', 'upcoming'])[0],
});

export const makeData = (lenght: number): EventSchedule[] => [...new Array(lenght)].map(() => newEvent());
