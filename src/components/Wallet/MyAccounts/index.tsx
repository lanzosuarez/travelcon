import { Card, CardHeader } from '@/components/common/DashboardCard';
import { Avatar, Box, Button, HStack, IconButton, List, ListItem, Radio, Stack, Text } from '@chakra-ui/react';
import { RiAddLine } from 'react-icons/ri';

export const MyAccounts = () => {
  return (
    <Card>
      <CardHeader title="My Accounts" />
      <Stack w="300px" spacing="6">
        <List spacing={3}>
          <ListItem>
            <HStack justifyContent="space-between" spacing="6">
              <HStack>
                <Avatar size="sm" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                <Text>Stefan Drako - </Text>
                <Text as="i">* 1234</Text>
              </HStack>
            </HStack>
          </ListItem>
          <ListItem>
            <HStack justifyContent="space-between" spacing="6">
              <HStack>
                <Avatar size="sm" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                <Text>Stefan Drako - </Text>
                <Text as="i">* 1234</Text>
              </HStack>
            </HStack>
          </ListItem>
          <ListItem>
            <HStack justifyContent="space-between" spacing="6">
              <HStack>
                <Avatar size="sm" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                <Text>Stefan Drako - </Text>
                <Text as="i">* 1234</Text>
              </HStack>
            </HStack>
          </ListItem>
        </List>
        <Button leftIcon={<RiAddLine />} colorScheme="blue">
          Add Acount
        </Button>
      </Stack>
    </Card>
  );
};
