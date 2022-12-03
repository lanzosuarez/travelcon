import { Totals } from '@/components/Wallet';
import { IncomeActivity } from '@/components/Wallet/IncomeActivity';
import { MyAccounts } from '@/components/Wallet/MyAccounts';
import { RecentTransactions } from '@/components/Wallet/RecentTransactions';
import { Button, HStack, Stack } from '@chakra-ui/react';
import React from 'react';

const WalletPage = () => {
  return (
    <Stack spacing="4">
      <Totals />
      <IncomeActivity />
      <RecentTransactions />
    </Stack>
  );
};

export default WalletPage;
