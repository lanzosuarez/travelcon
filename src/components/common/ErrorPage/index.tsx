import { Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { useMatch } from '@tanstack/react-location';

export const ErrorPage = () => {
  const { error } = useMatch();
  return (
    <Flex minH="100vh" alignItems="center" justifyContent="center">
      <Stack textAlign="center">
        <Heading fontWeight="semibold">Oooops!</Heading>
        <Text>{(error as Error)?.message || 'Sorry, an unexpected error has occurred.'}</Text>
      </Stack>
    </Flex>
  );
};

export const NotFoundPage = () => (
  <Flex minH="100vh" alignItems="center" justifyContent="center">
    <Stack textAlign="center">
      <Heading fontWeight="semibold">Oooops!</Heading>
      <Text>We can't find the page you requested</Text>
    </Stack>
  </Flex>
);
