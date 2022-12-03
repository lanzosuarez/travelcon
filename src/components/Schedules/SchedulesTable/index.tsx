import { Pagination } from '@/components/common';
import { usePaginationState } from '@/hooks';
import { useSortingState } from '@/hooks/useSortingState';
import { LocationGenerics, SchedulePageSearch } from '@/routes';
import {
  Badge,
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useNavigate, useSearch } from '@tanstack/react-location';
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiCloseLine,
  RiHandCoinLine,
  RiInformationLine,
  RiLockLine,
  RiMoreFill,
  RiTeamLine,
} from 'react-icons/ri';
import { NumericFormat } from 'react-number-format';
import { isNil } from 'remeda';
import { makeData } from '../Schedules/makeData';
import { EventSchedule } from '../Schedules/types';

const columnHelper = createColumnHelper<EventSchedule>();

const statusMap: Record<EventSchedule['status'], string> = {
  completed: 'green',
  ongoing: 'orange',
  open: 'blue',
  upcoming: 'yellow',
};

const SchedulesTable = () => {
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
        sortBy: sorting[0]?.id as SchedulePageSearch['sortBy'],
      }),
    });
  }, []);

  // Sorting State
  const [sorting, setSorting] = useSortingState(
    [{ desc: search.sort === 'desc', id: search.sortBy! }],
    onSortingChange,
  );

  const columns = React.useMemo(() => {
    const actionsCol: ColumnDef<EventSchedule> = {
      cell: ({ row }) => {
        const { status } = row.original;
        switch (status) {
          case 'ongoing':
            return (
              <Menu isLazy>
                <MenuButton as={IconButton} aria-label="Options" icon={<RiMoreFill />} variant="outline" />
                <MenuList>
                  <MenuItem icon={<RiHandCoinLine />}>Collection</MenuItem>
                </MenuList>
              </Menu>
            );
          case 'upcoming':
            return (
              <Menu isLazy>
                <MenuButton as={IconButton} aria-label="Options" icon={<RiMoreFill />} variant="outline" />
                <MenuList>
                  <MenuItem
                    icon={<RiTeamLine />}
                    onClick={() =>
                      navigate({ to: '', search: (old) => ({ ...old, scheduleAssignment: row.original.id }) })
                    }
                    value="assignment"
                  >
                    Assignment
                  </MenuItem>
                  <MenuItem color="red" icon={<RiCloseLine />}>
                    Cancel
                  </MenuItem>
                </MenuList>
              </Menu>
            );
          case 'open':
            return (
              <Menu isLazy>
                <MenuButton as={IconButton} aria-label="Options" icon={<RiMoreFill />} variant="outline" />
                <MenuList>
                  <MenuItem icon={<RiLockLine />}>Lock In</MenuItem>
                  <MenuItem color="red" icon={<RiCloseLine />}>
                    Cancel
                  </MenuItem>
                </MenuList>
              </Menu>
            );
        }
        return (
          <Menu isLazy>
            <MenuButton as={IconButton} aria-label="Options" icon={<RiMoreFill />} variant="outline" />
            <MenuList>
              <MenuItem icon={<RiInformationLine />}>Details</MenuItem>
            </MenuList>
          </Menu>
        );
      },
      id: 'actions',
    };

    const columns = [
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => (
          <Badge fontWeight="normal" colorScheme={statusMap[info.getValue()]} textTransform="capitalize">
            {info.getValue()}
          </Badge>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor('eventName', {
        header: 'Event Name',
        id: 'name',
      }),

      columnHelper.accessor('schedule', {
        header: 'Schedule',
        id: 'schedule',
      }),
      columnHelper.accessor('booked', {
        header: 'Guests',
        id: 'guests',
        cell: (info) => (
          <Box>
            <NumericFormat value={info.getValue()} displayType="text" thousandSeparator /> guests
          </Box>
        ),
      }),
      columnHelper.accessor('paid', {
        header: 'Paid',
        id: 'paid',
        cell: (info) => (
          <NumericFormat suffix=".00" value={info.getValue()} displayType="text" thousandSeparator prefix="Php " />
        ),
      }),
      columnHelper.accessor('toCollect', {
        header: 'To Collect',
        id: 'toCollect',
        cell: (info) => (
          <NumericFormat suffix=".00" value={info.getValue()} displayType="text" thousandSeparator prefix="Php " />
        ),
      }),
      columnHelper.accessor('totalEarnings', {
        header: 'Total Earnings',
        id: 'totalEarnings',
        cell: (info) => (
          <Box>
            <NumericFormat suffix=".00" value={info.getValue()} displayType="text" thousandSeparator prefix="Php " />{' '}
          </Box>
        ),
      }),
      actionsCol,
    ];
    return columns;
  }, [navigate]);

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

export default SchedulesTable;
