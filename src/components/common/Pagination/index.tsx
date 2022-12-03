import {
  Flex,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  Text,
  HStack,
  IconButton,
  Input,
  Stack,
} from "@chakra-ui/react";
import debounce from "lodash.debounce";
import React from "react";
import { PropsWithChildren } from "react";
import { MdExpandMore, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { TbChevronsLeft, TbChevronsRight } from "react-icons/tb";
import { PaginationProps } from "./types";

const pageSizeOptions = [10, 20, 30];

export const Pagination: React.FC<PropsWithChildren<PaginationProps>> = ({
  setPageSize,
  gotoPage,
  canNextPage,
  canPreviousPage,
  currentPage,
  nextPage,
  pageCount,
  pageSize,
  previousPage,
}) => {
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Menu autoSelect={false}>
        <MenuButton
          border="1px solid"
          borderColor="gray.200"
          variant="text"
          as={Button}
          rightIcon={<MdExpandMore />}
        >
          <Text fontWeight="normal">Show {pageSize} items</Text>
        </MenuButton>
        <MenuList>
          <MenuOptionGroup defaultValue={pageSize + ""}>
            {pageSizeOptions.map((pageSizeItem) => (
              <MenuItemOption
                key={pageSizeItem}
                bg={pageSize === pageSizeItem ? "gray.100" : "none"}
                value={`${pageSizeItem}`}
                onClick={() => setPageSize(pageSizeItem)}
              >
                Showing {pageSizeItem} items
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
      <HStack spacing={4}>
        <HStack spacing={2}>
          <IconButton
            disabled={!canPreviousPage}
            onClick={() => gotoPage(currentPage - 5)}
            aria-label="previous-page"
            icon={<TbChevronsLeft />}
          />
          <IconButton
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            aria-label="previous-page"
            icon={<MdChevronLeft />}
          />
          <IconButton
            onClick={() => nextPage()}
            disabled={!canNextPage}
            aria-label="next-page"
            icon={<MdChevronRight />}
          />
          <IconButton
            onClick={() => gotoPage(currentPage + 5)}
            aria-label="next-page"
            icon={<TbChevronsRight />}
            disabled={!canNextPage}
          />
        </HStack>
        <Text fontWeight="semibold">
          Page {currentPage + 1} of {pageCount}
        </Text>
        <Text>|</Text>
        <HStack color="gray.900">
          <Text>Go to page</Text>
          <Input
            defaultValue={currentPage + 1}
            onChange={debounce((e) => {
              if (e.target.value !== "")
                gotoPage(e.target.value ? Number(e.target.value) - 1 : 0);
            }, 200)}
            w="60px"
            type="number"
            max={pageCount}
          />
        </HStack>
      </HStack>
    </Flex>
  );
};

export const MobilePagination: React.FC<PropsWithChildren<PaginationProps>> = ({
  setPageSize,
  gotoPage,
  canNextPage,
  canPreviousPage,
  currentPage,
  nextPage,
  pageCount,
  pageSize,
  previousPage,
}) => (
  <Stack>
    <Flex alignItems="center" justifyContent="space-between">
      <Menu autoSelect={false}>
        <MenuButton
          pl="0"
          variant="text"
          as={Button}
          rightIcon={<MdExpandMore />}
        >
          <Text fontWeight="normal">Showing {pageSize} items</Text>
        </MenuButton>
        <MenuList>
          <MenuOptionGroup defaultValue={pageSize + ""}>
            {pageSizeOptions.map((pageSizeItem) => (
              <MenuItemOption
                key={pageSizeItem}
                bg={pageSize === pageSizeItem ? "gray.100" : "none"}
                value={`${pageSizeItem}`}
                onClick={() => setPageSize(pageSizeItem)}
              >
                Showing {pageSizeItem} items
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
      <HStack>
        <Text>Go to page</Text>
        <Input
          defaultValue={currentPage + 1}
          onChange={debounce((e) => {
            if (e.target.value !== "")
              gotoPage(e.target.value ? Number(e.target.value) - 1 : 0);
          }, 200)}
          w="60px"
          type="number"
          max={pageCount}
        />
      </HStack>
    </Flex>
    <Flex alignItems="center" justifyContent="space-between">
      <Text fontWeight="semibold">
        Page {currentPage + 1} of {pageCount}
      </Text>
      <HStack spacing={2}>
        <IconButton
          disabled={!canPreviousPage}
          onClick={() => gotoPage(currentPage - 5)}
          aria-label="previous-page"
          icon={<TbChevronsLeft />}
        />
        <IconButton
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          aria-label="previous-page"
          icon={<MdChevronLeft />}
        />
        <IconButton
          onClick={() => nextPage()}
          disabled={!canNextPage}
          aria-label="next-page"
          icon={<MdChevronRight />}
        />
        <IconButton
          onClick={() => gotoPage(currentPage + 5)}
          aria-label="next-page"
          icon={<TbChevronsRight />}
          disabled={!canNextPage}
        />
      </HStack>
    </Flex>
  </Stack>
);
