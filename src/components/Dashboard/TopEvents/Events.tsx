import { Rating } from '@/components/common';
import { Stack, HStack, Box, Text, Image } from '@chakra-ui/react';
import React from 'react';
import { RiUser3Line, RiWalletLine, RiCalendar2Line } from 'react-icons/ri';

const Event = () => (
  <HStack spacing="3">
    <Image w="79px" h="74px" src="https://via.placeholder.com/150" />
    <Stack spacing="1" flex="1">
      <HStack flex="1" alignItems="center" spacing="2" justifyContent="space-between">
        <Text fontWeight="semibold">Machu Pichu</Text>
        <Rating rating={5} />
      </HStack>
      <Stack spacing="1">
        <HStack color="gray">
          <RiUser3Line />
          <Box fontSize="xs">
            <Text>
              <Text color="blue.500" as="span">
                200,203
              </Text>{' '}
              Bookings
            </Text>
          </Box>
        </HStack>
        <HStack color="gray">
          <RiWalletLine />
          <Box fontSize="xs">
            <Text>
              <Text color="blue.500" as="span">
                P 200,203
              </Text>{' '}
              Earnings
            </Text>
          </Box>
        </HStack>
        <HStack color="gray">
          <RiCalendar2Line />
          <Box fontSize="xs">
            <Text>
              <Text color="blue.500" as="span">
                213
              </Text>{' '}
              Completed Schedules
            </Text>
          </Box>
        </HStack>
      </Stack>
    </Stack>
  </HStack>
);

const Events = () => {
  return (
    <Stack spacing="4">
      {[1, 2, 3].map((item) => (
        <Event key={item} />
      ))}
    </Stack>
  );
};

export default Events;
