import { DateRangePicker } from '@/components/common';
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Select,
  Text,
} from '@chakra-ui/react';
import { endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, subMonths } from 'date-fns';
import { endOfDay, startOfDay } from 'date-fns/esm';
import React from 'react';
import { MdExpandMore } from 'react-icons/md';
import { useBoolean } from 'react-use';

const current = new Date();

const dateFilterValues = {
  'this month': [startOfMonth(current), endOfMonth(current)],
  'this week': [startOfWeek(current), endOfWeek(current)],
  today: [startOfDay(current), endOfDay(current)],
  'last 3 months': [startOfMonth(subMonths(current, 2)), endOfMonth(current)],
  custom: [startOfDay(current), endOfDay(current)],
} as const;

type DateFilters = keyof typeof dateFilterValues;
type DateRange = typeof dateFilterValues[DateFilters];

const formatDateRange = (dateRange: DateRange) =>
  `${format(dateRange[0], 'd MMM yyyy')} - ${format(dateRange[1], 'd MMM yyyy')}`;

export const DateFilter = () => {
  const [selectedFilter, selectFilter] = React.useState<[DateFilters, DateRange]>([
    'this month',
    dateFilterValues['this month'],
  ]);

  const [openDatePicker, toggleOpenDatePicker] = useBoolean(false);

  const [filter, dateRange] = selectedFilter;
  const values = React.useMemo(() => {
    const values = { ...dateFilterValues };
    if (filter === 'custom') {
      values['custom'] = dateRange;
    }
    return values;
  }, [filter, dateRange]);

  return (
    <Box bg="white">
      <Menu autoSelect={false} placement="bottom-end">
        <MenuButton
          textAlign="left"
          w="400px"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          variant="text"
          as={Button}
          rightIcon={<MdExpandMore />}
        >
          <Text textTransform="capitalize" fontWeight="normal">
            {filter} - ({formatDateRange(values[filter])})
          </Text>
        </MenuButton>
        <MenuList>
          <MenuOptionGroup
            defaultValue={filter}
            onChange={(e) => {
              selectFilter([e as DateFilters, values[e as DateFilters]]);
            }}
          >
            {Object.entries(values).map(([name]) => (
              <MenuItemOption
                key={name}
                bg={filter === name ? 'gray.100' : 'none'}
                value={name}
                onClick={() => {
                  if (name === 'custom') {
                    toggleOpenDatePicker();
                  }
                }}
              >
                <Text textTransform="capitalize">{name}</Text>
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
      <DateRangePicker
        onApply={(dateRange) => {
          if (dateRange?.from && dateRange?.to) {
            selectFilter(['custom', [dateRange?.from, dateRange?.to]]);
          }
        }}
        isOpen={openDatePicker}
        onClose={toggleOpenDatePicker}
      />
    </Box>
  );
};
