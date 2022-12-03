import { Card, CardHeader } from '@/components/common/DashboardCard';
import { HStack, Stack } from '@chakra-ui/react';
import { Badge } from './Badge';

export const Badges = () => {
  return (
    <Card bgColor="white" p="4" borderRadius="lg">
      <CardHeader title="Badges" />
      <HStack spacing="4">
        <Badge variant="gold" text="5 more events to PH 1st Top Rated" />
        <Badge variant="gold" text="5 more events to PH 1st Top Rated" />
        <Badge variant="silver" text="5 more events to PH 1st Top Rated" />
        <Badge variant="bronze" text="5 more events to PH 1st Top Rated" />
      </HStack>
    </Card>
  );
};
