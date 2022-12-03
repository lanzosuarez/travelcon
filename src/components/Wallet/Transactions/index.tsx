import { Stack, Box } from '@chakra-ui/react';
import React from 'react';
import { TransactionsTable } from '../common';

export const Transactions = () => {
  return (
    <Stack>
      <Box bg="white">
        <TransactionsTable />
      </Box>
    </Stack>
  );
};
