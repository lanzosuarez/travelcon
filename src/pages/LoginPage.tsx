import { LocationGenerics } from '@/routes';
import { useAuthActions, useUser } from '@/store/useAuth';
import { Button, Center, FormControl, FormLabel, Heading, Input, Link, Stack, Text } from '@chakra-ui/react';
import { Link as RouteLink, Navigate, useNavigate, useSearch } from '@tanstack/react-location';
import React from 'react';

const Login = () => {
  // TODO Persist user
  const user = useUser();
  const { signIn } = useAuthActions();
  const navigate = useNavigate<LocationGenerics>();
  const search = useSearch<LocationGenerics>();

  const from = search.from || '/dashboard';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // TODO: Implement login
    event.preventDefault();
    signIn({ name: 'Pons' }, () => {
      navigate({ to: from });
    });
  };

  if (user) {
    <Navigate to="/dashboard" />;
  }

  return (
    <Center h="100vh">
      <form onSubmit={handleSubmit}>
        <Stack w="sm" p="6" spacing="8">
          <Heading fontSize="3xl" fontWeight="semibold">
            Login
          </Heading>
          <Stack spacing="4">
            <FormControl>
              <FormLabel fontSize="sm">Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm">Password</FormLabel>
              <Input type="password" name="password" />
              <Text mt="1" fontSize="sm" color="gray" textAlign="right">
                <Link>Forgot Password</Link>
              </Text>
            </FormControl>
          </Stack>
          <Stack mt="3">
            <Button type="submit" colorScheme="blue">
              Login
            </Button>
            <Center fontSize="sm">
              <Text mr="1">Don't have an account?</Text>{' '}
              <Link to="/register" as={RouteLink} color="gray">
                Sign up here!
              </Link>
            </Center>
          </Stack>
        </Stack>
      </form>
    </Center>
  );
};

export default Login;
