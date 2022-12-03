import { Avatar, Box, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { RiHeartFill } from "react-icons/ri";

const Organizer = () => {
  return (
    <Stack>
      <HStack justifyContent="space-between">
        <HStack>
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          <Stack spacing="1">
            <Heading fontWeight="semibold" fontSize="md">
              Lloyd Forger
            </Heading>
            <Text fontSize="xs" color="blue.500">
              Admin Organizer
            </Text>
          </Stack>
        </HStack>
        <HStack>
          <Box
            p="2"
            borderRadius="50%"
            border="1px solid"
            color="red.500"
            borderColor="red.300"
            bgColor="red.100"
          >
            <RiHeartFill />
          </Box>
          <Text>50k</Text>
        </HStack>
      </HStack>
      <Box>
        <Text color="gray.500" fontSize="xs">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </Text>
      </Box>
    </Stack>
  );
};

export const Organizers = () => {
  return (
    <Stack spacing="4">
      <Organizer />
      <Organizer />
    </Stack>
  );
};
