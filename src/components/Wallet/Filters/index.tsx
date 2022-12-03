import { HStack } from '@chakra-ui/react';
import { DateFilter, TextFilter } from '@/components/common';
import { StatusFilter } from '@/components/common';

const statusFilters = {
  All: '',
  Pending: 'pending',
  Received: 'recevied',
} as const;

type Filters = keyof typeof statusFilters;

export const Filters = () => {
  return (
    <HStack>
      <TextFilter />
      <DateFilter />
      <StatusFilter<Filters>
        filters={statusFilters}
        defaultValue="All"
        onChange={(value) => {
          console.log(value);
        }}
        menuButtonProps={{ w: 200 }}
      />
    </HStack>
  );
};
