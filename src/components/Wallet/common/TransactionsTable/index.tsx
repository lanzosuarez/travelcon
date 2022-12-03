import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { FC } from 'react';
import { Transaction } from './types';
import { Badge, Box, Flex, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { formatDate } from '@/lib';
import { NumericFormat } from 'react-number-format';
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';
import { makeData } from './makeData';
import { Pagination } from '@/components/common';

const columnHelper = createColumnHelper<Transaction>();

const columns = [
  columnHelper.accessor('transactionNo', {
    header: 'No.',
    cell: ({ getValue }) => `#${getValue()}`,
  }),
  columnHelper.accessor('sender', {
    header: 'Sender',
  }),
  columnHelper.accessor('date', {
    header: 'Date',
    cell: ({ getValue }) => <Text>{formatDate(new Date(getValue()))}</Text>,
  }),
  columnHelper.accessor('type', {
    header: 'Type',
    cell: ({ getValue }) => <Text textTransform="capitalize">{getValue()}</Text>,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({ getValue }) => (
      <Badge fontWeight="normal" colorScheme={getValue() === 'pending' ? 'red' : 'green'}>
        {getValue()}
      </Badge>
    ),
  }),
  columnHelper.accessor('to', {
    header: 'Destination',
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
    id: 'amount',
    cell: (info) => (
      <Text>
        <NumericFormat value={info.getValue()} displayType="text" thousandSeparator prefix="Php " />
      </Text>
    ),
  }),
];

export const TransactionsTable: FC<{ showPagination?: boolean }> = ({ showPagination = true }) => {
  const [data] = React.useState<Transaction[]>(() => makeData(10));
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Stack bg="white" shadow="sm" px="4" spacing="6" pos="relative">
      {showPagination && (
        <Box pt="6">
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
        </Box>
      )}
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
                    <Th
                      textTransform="capitalize"
                      fontSize="sm"
                      fontWeight="semibold"
                      key={header.id}
                      colSpan={header.colSpan}
                    >
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
