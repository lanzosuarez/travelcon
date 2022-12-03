import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
} from '@chakra-ui/react';
import { MdExpandMore } from 'react-icons/md';
import { RiAddLine, RiCoinLine, RiMore2Fill, RiNotification2Line } from 'react-icons/ri';
import { CollapseSidebar } from '../Sidebar/CollapseSidebar';

const AgencySelection = () => {
  return (
    <Menu>
      <MenuButton
        sx={{
          svg: {
            w: '20px',
            h: '20px',
          },
        }}
        as={Button}
        variant="text"
        rightIcon={<MdExpandMore />}
      >
        <HStack>
          <Image
            boxSize="2rem"
            borderRadius="full"
            src="https://placekitten.com/100/100"
            alt="Fluffybuns the destroyer"
            mr="12px"
          />
          <Text fontWeight="semibold" color="gray.900">
            Travel Pinas
          </Text>
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuOptionGroup defaultValue="asc" title="Agencies" type="radio">
          <MenuItem minH="48px">
            <Image
              boxSize="2rem"
              borderRadius="full"
              src="https://placekitten.com/100/100"
              alt="Fluffybuns the destroyer"
              mr="12px"
            />
            <span>Byahero</span>
          </MenuItem>
        </MenuOptionGroup>
        <MenuDivider />
        <MenuOptionGroup defaultValue="asc" type="radio">
          <MenuItemOption icon={<RiAddLine />} value="asc">
            Add New Agency
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

const AppHeader = () => {
  return (
    <Flex
      as="header"
      pos="fixed"
      width="calc(100% - 250px)"
      left="250px"
      zIndex="sticky"
      bgColor="white"
      px="6"
      py="16px"
      pl="8"
      justifyContent="space-between"
    >
      <Flex alignItems="center">
        <CollapseSidebar />
        <AgencySelection />
      </Flex>
      <HStack>
        <HStack
          spacing="2"
          sx={{
            svg: {
              w: '25px',
              h: '25px',
              color: 'gold',
            },
          }}
        >
          <Text fontWeight="semibold">200,103</Text>
          <RiCoinLine />
        </HStack>
        <Box pos="relative">
          <IconButton size="lg" variant="ghost" aria-label="open-notifications" icon={<RiNotification2Line />} />
          <Badge bottom="25px" left="22px" pos="absolute" w="10px" h="10px" borderRadius="50%" bgColor="red.500" />
        </Box>
        <Flex>
          <HStack>
            <Image w="40px" h="40px" src="https://via.placeholder.com/150" />
            <Box>
              <Heading color="gray.900" fontWeight="semibold" fontSize="lg">
                Pons Suarez
              </Heading>
              <Text fontSize="xs" color="gray">
                pons@gmail.com
              </Text>
            </Box>
          </HStack>
          <Box
            ml="2"
            borderRadius="5px"
            sx={{
              svg: {
                w: '25px',
                h: '25px',
              },
            }}
          >
            <IconButton minW="20px" aria-label="more" colorScheme="blue" icon={<RiMore2Fill />} />
          </Box>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default AppHeader;
