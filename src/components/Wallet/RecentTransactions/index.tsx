import { Card, CardHeader } from '@/components/common/DashboardCard';
import { Button, Text } from '@chakra-ui/react';
import React from 'react';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { TransactionsTable } from '../common/TransactionsTable';

export const RecentTransactions = () => {
  return (
    <Card>
      <CardHeader
        title="Recent Transactions"
        action={
          <Button
            sx={{
              svg: {
                w: '20px',
                h: '20px',
              },
            }}
            rightIcon={<RiArrowDropRightLine />}
            colorScheme="gray.500"
            variant="link"
            color="gray"
          >
            <Text fontWeight="light" fontSize="sm">
              View All
            </Text>
          </Button>
        }
      />
      <TransactionsTable showPagination={false} />
    </Card>
  );
};
