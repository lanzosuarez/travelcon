import { faker } from '@faker-js/faker';
import { Transaction } from './types';

const newTransaction = (): Transaction => ({
  transactionNo: faker.datatype.number({ max: 100 }).toString(),
  sender: faker.address.city(),
  date: faker.date.recent(),
  amount: faker.datatype.number(30000),
  status: faker.helpers.shuffle<Transaction['status']>(['pending', 'received'])[0],
  type: faker.helpers.shuffle<Transaction['type']>(['payout', 'payment', 'refund'])[0],
  to: faker.finance.accountName(),
});

export const makeData = (lenght: number): Transaction[] => [...new Array(lenght)].map(() => newTransaction());
