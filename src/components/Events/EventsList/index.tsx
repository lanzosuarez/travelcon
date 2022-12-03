import { Rating } from '@/components/common';
import { usePaginationState } from '@/hooks';
import { LocationGenerics } from '@/routes';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { useSearch } from '@tanstack/react-location';

import 'pure-react-carousel/dist/react-carousel.es.css';
import {
  RiArrowDownLine,
  RiCalendar2Line,
  RiDeleteBin5Line,
  RiDiscussLine,
  RiEditLine,
  RiHandCoinLine,
  RiMapPinLine,
  RiMoreFill,
  RiTeamLine,
} from 'react-icons/ri';

const EventItem = () => {
  return (
    <Stack pos="relative" cursor="pointer" borderRadius="20px" spacing="4" bg="white" w="320px" p="4">
      <Box>
        <Image borderRadius="20px" src="https://via.placeholder.com/290x169" />
      </Box>
      <Stack>
        <Heading fontSize="md" fontWeight="semibold">
          Jimbaran Beach
        </Heading>
        <Flex alignItems="center" justifyContent="space-between">
          <HStack color="gray.500" fontSize="xs">
            <RiMapPinLine />
            <Text>Greece,Europe</Text>
          </HStack>
          <Rating rating={5} size="lg" />
        </Flex>
      </Stack>
      <Flex justifyContent="space-between" fontSize="sm" color="gray.800">
        <Stack>
          <HStack>
            <RiCalendar2Line />
            <Text>213 Schedules</Text>
          </HStack>
          <HStack>
            <RiTeamLine />
            <Text>5,202 guests</Text>
          </HStack>
        </Stack>
        <Stack>
          <HStack>
            <RiHandCoinLine />
            <Text>P 446,000</Text>
          </HStack>
          <HStack>
            <RiDiscussLine />
            <Text>20,123 reviews</Text>
          </HStack>
        </Stack>
      </Flex>
      <HStack justifyContent="center" spacing="5">
        <Button size="sm" variant="link" colorScheme="blue">
          See guests album
        </Button>
        <Button size="sm" variant="link" colorScheme="blue">
          See all reviews
        </Button>
      </HStack>
      <Menu placement="bottom-end">
        <MenuButton
          borderRadius="50%"
          right="10"
          pos="absolute"
          as={IconButton}
          aria-label="Options"
          icon={<RiMoreFill />}
        />
        <MenuList>
          <MenuItem icon={<RiEditLine />}>Edit</MenuItem>
          <MenuItem color="red.500" icon={<RiDeleteBin5Line />}>
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  );
};

const EventstList = () => {
  const search = useSearch<LocationGenerics>();
  const [{ pageIndex, pageSize }, setPagination] = usePaginationState(
    {
      pageIndex: search.pageIndex!,
      pageSize: search.pageSize!,
    },
    (pagination) => {
      console.log(pagination);
    },
  );
  const setPageIndex = (pageIndex: number) => setPagination((old) => ({ ...old, pageIndex }));

  const setPageSize = (pageSize: number) => setPagination((old) => ({ ...old, pageSize }));

  return (
    <Stack spacing="5" pos="relative">
      {/* <Box zIndex="sticky" pos="fixed" bottom="10" right="10">
        <Button colorScheme="blue" rightIcon={<RiArrowDownLine />}>
          Load More
        </Button>
      </Box> */}
      {/* <Pagination
        canNextPage={pageIndex < 1 - 1}
        canPreviousPage={pageIndex > 0}
        currentPage={pageIndex}
        gotoPage={(page) => setPageIndex(page)}
        nextPage={() => setPageIndex(pageIndex + 1)}
        previousPage={() => setPageIndex(pageIndex - 1)}
        pageCount={1}
        pageSize={pageSize}
        setPageSize={(pageSize) => setPageSize(pageSize)}
      /> */}
      <HStack spacing="5">
        <HStack>
          <Text>Sort By:</Text>
          <Box>
            <Select bg="white">
              <option>Name</option>
            </Select>
          </Box>
        </HStack>
        <RadioGroup defaultValue="1">
          <HStack spacing="4">
            <Radio value="1">Asc</Radio>
            <Radio value="2">Desc</Radio>
            <Radio value="3">None</Radio>
          </HStack>
        </RadioGroup>
      </HStack>
      <Wrap pos="relative" spacing="4">
        <WrapItem>
          <EventItem />
        </WrapItem>
        <WrapItem>
          <EventItem />
        </WrapItem>
        <WrapItem>
          <EventItem />
        </WrapItem>
        <WrapItem>
          <EventItem />
        </WrapItem>
        <WrapItem>
          <EventItem />
        </WrapItem>
        <WrapItem>
          <EventItem />
        </WrapItem>
      </Wrap>
    </Stack>
  );
};

export default EventstList;
