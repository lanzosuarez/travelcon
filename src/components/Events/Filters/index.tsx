import { HStack } from '@chakra-ui/react';
import { DateFilter, TextFilter, StatusFilter } from '@/components/common';
import { CommonStatusFilters } from './CommonStatusFilters';
import { useMatchRoute } from '@tanstack/react-location';

export const Filters = () => {
  const matchedRoute = useMatchRoute();
  const isSchedules = matchedRoute({ to: 'schedules' });
  return (
    <HStack>
      <TextFilter />
      <DateFilter />
      <CommonStatusFilters key={isSchedules ? 'schedule' : 'event'} />
    </HStack>
  );
};
