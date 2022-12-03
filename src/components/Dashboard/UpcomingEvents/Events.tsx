import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { RiCalendar2Line } from "react-icons/ri";

const Event = () => {
  return (
    <HStack spacing="4">
      <Box borderRadius="sm">
        <Image
          src="https://via.placeholder.com/150"
          borderRadius="sm"
          width="79px"
          height="69px"
        />
      </Box>
      <Stack>
        <Heading fontWeight="semibold" fontSize="md">
          Caramoan Tri-city Tour
        </Heading>
        <HStack>
          <RiCalendar2Line />
          <Text fontSize="xs" color="gray.500">
            09 Oct - 12 Oct
          </Text>
        </HStack>
        <Flex fontSize="xs" justifyContent="space-between">
          <Text color="blue.500">20+ joiners</Text>
          <Text fontWeight="semibold" color="green.500">
            On going
          </Text>
        </Flex>
      </Stack>
    </HStack>
  );
};

export const Events = () => {
  return (
    <Stack spacing="4">
      <Event />
      <Event />
      <Event />
      <Event />
      <Event />
    </Stack>
  );
};
