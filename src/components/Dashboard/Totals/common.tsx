import { Box, Heading, HStack, Text } from '@chakra-ui/react';
import { FC } from 'react';

export const TotalCard: FC<{ title: string; icon: React.ReactNode; total: string }> = ({ title, icon, total }) => {
  return (
    <HStack bgColor="white" shadow="lg" p="6" pr="8" borderRadius="lg" spacing="8">
      <Box color="blue.500">{icon}</Box>
      <Box textAlign="center">
        <Heading fontWeight="semibold">{total}</Heading>
        <Text fontSize="xs" color="gray">
          {title}
        </Text>
      </Box>
    </HStack>
  );
};
