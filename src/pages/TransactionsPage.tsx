import { Filters, Transactions } from '@/components/Wallet';
import { Box, Button, Stack } from '@chakra-ui/react';
import React from 'react';
import { RiAddLine } from 'react-icons/ri';

const TransactionsPage = () => {
  return (
    <Stack spacing="5">
      <Box>
        <Button leftIcon={<RiAddLine />} colorScheme="blue">
          New Transaction
        </Button>
      </Box>
      <Box>
        <Filters />
      </Box>
      <Box>
        <Transactions />
      </Box>
    </Stack>
  );
};

export default TransactionsPage;
