import {
  Button,
  Center,
  FormControl,
  Text,
  FormLabel,
  Input,
  Stack,
  Link,
  Heading,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
} from "@chakra-ui/react";
import { Link as RouteLink } from "@tanstack/react-location";
import React from "react";

const Register = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <Center h="100vh">
      <Stack w="sm" p="6" spacing="8">
        <Heading fontSize="3xl" fontWeight="semibold">
          Register
        </Heading>
        <form>
          <Stack spacing="4">
            <FormControl>
              <FormLabel fontSize="sm">Travel Agency Name</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm">Owner Name</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm">Mobile</FormLabel>
              <InputGroup>
                <InputLeftAddon children="+63" />
                <Input maxLength={10} type="tel" />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm">Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm">Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Stack>
        </form>
        <Stack mt="3">
          <Button colorScheme="blue">Register</Button>
          <Center fontSize="sm">
            <Text mr="1">Already have an account?</Text>{" "}
            <Link to="/" as={RouteLink} color="gray">
              Sign in here!
            </Link>
          </Center>
        </Stack>
      </Stack>
    </Center>
  );
};

export default Register;
