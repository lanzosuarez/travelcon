import React from 'react';
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import {
  Box,
  Checkbox,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Image,
  Text,
  Flex,
} from '@chakra-ui/react';
import { Event } from '../Events/types';
import { makeData } from '../Events/makeData';
import { RiEditLine, RiMoreFill, RiDeleteBin5Line, RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { NumericFormat } from 'react-number-format';
import { Pagination } from '@/components/common';
import { useNavigate, useSearch } from '@tanstack/react-location';
import { EventsPageSearch, LocationGenerics } from '@/routes';
import { isNil } from 'remeda';
import { usePaginationState } from '@/hooks';
import { useSortingState } from '@/hooks/useSortingState';

const columnHelper = createColumnHelper<Event>();

const selectionCol: ColumnDef<Event> = {
  id: 'select',
  header: ({ table }) => (
    <Checkbox
      {...{
        isChecked: table.getIsAllRowsSelected(),
        isIndeterminate: table.getIsSomeRowsSelected(),
        onChange: table.getToggleAllRowsSelectedHandler(),
      }}
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      {...{
        isChecked: row.getIsSelected(),
        isIndeterminate: row.getIsSomeSelected(),
        onChange: row.getToggleSelectedHandler(),
      }}
    />
  ),
};

const actionsCol: ColumnDef<Event> = {
  cell: () => (
    <Menu>
      <MenuButton as={IconButton} aria-label="Options" icon={<RiMoreFill />} variant="outline" />
      <MenuList>
        <MenuItem icon={<RiEditLine />}>Edit</MenuItem>
        <MenuItem color="red.500" icon={<RiDeleteBin5Line />}>
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  ),
  id: 'actions',
};

const columns = [
  selectionCol,
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => <Switch id="event-status" checked={info.getValue() === 'active'} />,
    enableSorting: false,
  }),
  columnHelper.accessor('name', {
    header: 'Event Name',
    id: 'name',
    cell: (info) => (
      <HStack spacing="4">
        <Image borderRadius="sm" w="80px" h="50px" src="https://via.placeholder.com/80x50" />
        <Text>{info.getValue()}</Text>
      </HStack>
    ),
  }),
  columnHelper.accessor('location', {
    header: 'Location',
    id: 'location',
  }),
  columnHelper.accessor('schedules', {
    header: 'Schedules',
    id: 'schedules',
    cell: (info) => (
      <Box>
        <NumericFormat value={info.getValue()} displayType="text" thousandSeparator /> schedules
      </Box>
    ),
  }),
  columnHelper.accessor('guests', {
    header: 'Guests',
    id: 'guests',
    cell: (info) => (
      <Box>
        <NumericFormat value={info.getValue()} displayType="text" thousandSeparator /> guests
      </Box>
    ),
  }),
  columnHelper.accessor('totalEarnings', {
    header: 'Total Earnings',
    id: 'totalEarnings',
    cell: (info) => <NumericFormat value={info.getValue()} displayType="text" thousandSeparator prefix="Php " />,
  }),
  columnHelper.accessor('reviews', {
    header: 'Reviews',
    id: 'reviews',
  }),
  columnHelper.accessor('rating', {
    header: 'Rating',
    id: 'rating',
  }),
  actionsCol,
];

const EventsTable = () => {
  const search = useSearch<LocationGenerics>();
  const navigate = useNavigate<LocationGenerics>();
  const [data] = React.useState(() => makeData(10));

  const onPaginationChange = React.useCallback(
    (pagination: PaginationState) => {
      navigate({
        search: (old) => ({
          ...old,
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
        }),
      });
    },
    [navigate],
  );
  // Pagination State
  const [pagination, setPagination] = usePaginationState(
    {
      pageIndex: search.pageIndex!,
      pageSize: search.pageSize!,
    },
    onPaginationChange,
  );

  const onSortingChange = React.useCallback((sorting: SortingState) => {
    navigate({
      // if not sort is active, set sort to undefined
      search: (old) => ({
        ...old,
        sort: !isNil(sorting[0]?.desc) ? (sorting[0]?.desc ? 'desc' : 'asc') : undefined,
        sortBy: sorting[0]?.id as EventsPageSearch['sortBy'],
      }),
    });
  }, []);

  // Sorting State
  const [sorting, setSorting] = useSortingState(
    [{ desc: search.sort === 'desc', id: search.sortBy! }],
    onSortingChange,
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    pageCount: Math.ceil(data.length / pagination.pageSize),
    state: {
      pagination,
      sorting,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    manualPagination: true,
  });

  return (
    <Stack bg="white" shadow="lg" pt="6" px="4" spacing="6" pos="relative">
      <Pagination
        currentPage={table.getState().pagination.pageIndex}
        pageCount={table.getPageCount()}
        canPreviousPage={table.getCanPreviousPage()}
        canNextPage={table.getCanNextPage()}
        gotoPage={(page) => table.setPageIndex(page)}
        nextPage={() => table.nextPage()}
        previousPage={() => table.previousPage()}
        pageSize={table.getState().pagination.pageSize}
        setPageSize={(pageSize) => table.setPageSize(pageSize)}
      />
      <TableContainer>
        <Table>
          <Thead bg="tableHeader.100">
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sorted = header.column.getIsSorted();
                  const isDesc = sorted === 'desc';
                  const isAsc = sorted === 'asc';
                  return (
                    <Th textTransform="capitalize" fontWeight="semibold" key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <Flex alignItems="center" cursor="pointer" onClick={header.column.getToggleSortingHandler()}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {canSort && (
                            <Box ml="2" sx={{ svg: { w: '16px', h: '16px' } }}>
                              <RiArrowUpSLine color={isAsc ? 'black' : 'gray'} />
                              <RiArrowDownSLine color={isDesc ? 'black' : 'gray'} />
                            </Box>
                          )}
                        </Flex>
                      )}
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id} fontSize="sm" color="gray.900">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default EventsTable;
