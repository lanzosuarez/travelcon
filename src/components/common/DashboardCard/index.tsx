import { Flex, Heading, Stack } from '@chakra-ui/react';
import React, { ComponentProps, FC, PropsWithChildren } from 'react';

export const CardHeader: FC<{
  title: React.ReactNode;
  action?: React.ReactNode;
}> = ({ title, action }) => {
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Heading fontWeight="semibold" fontSize="lg">
        {title}
      </Heading>
      {action}
    </Flex>
  );
};

export const Card: FC<ComponentProps<typeof Stack> & PropsWithChildren> = ({ children, ...props }) => (
  <Stack shadow="lg" bgColor="white" p="4" borderRadius="lg" spacing="4" {...props}>
    {children}
  </Stack>
);
