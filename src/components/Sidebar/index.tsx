import { useAuthActions } from '@/store/useAuth';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Center,
  Flex,
  HStack,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { Link } from '@tanstack/react-location';
import { IconType } from 'react-icons/lib';
import { RiCalendar2Line, RiHomeLine, RiLogoutBoxLine, RiUser3Line, RiWalletLine } from 'react-icons/ri';

type Nav = {
  to: string;
  title: string;
  icon: IconType;
  exact?: boolean;
  children?: { title: string; to: string }[];
};

const navItems: Nav[] = [
  {
    exact: true,
    to: '',
    title: 'Dashboard',
    icon: RiHomeLine,
  },
  {
    to: 'events',
    title: 'Events',
    icon: RiCalendar2Line,
  },
  {
    to: 'wallet',
    title: 'E-Wallet',
    icon: RiWalletLine,
    children: [
      {
        title: 'Transactions',
        to: 'wallet/transactions',
      },
      {
        title: 'Accounts',
        to: 'wallet/accounts',
      },
    ],
  },
  {
    to: 'profile',
    title: 'Profile',
    icon: RiUser3Line,
  },
];

const Sidebar = () => {
  const { signOut } = useAuthActions();
  return (
    <Flex
      as="aside"
      left="0"
      pos="fixed"
      flexDir="column"
      w="250px"
      h="100%"
      pt="80px"
      pb="38px"
      zIndex="sticky"
      bgColor="#f1f1f1"
    >
      <Accordion allowMultiple>
        {navItems.map((nav) => (
          <AccordionItem
            key={nav.title}
            border="none"
            sx={{
              svg: {
                w: '25px',
                h: '25px',
              },
              button: {
                color: 'gray.500',
                _hover: {
                  color: 'blue.500 !important',
                  transition: 'color 300ms ease-in',
                },
              },
              '.active': {
                color: 'blue.500 !important',
                transition: 'color 300ms ease-in',
                fontWeight: 'semibold',
              },
            }}
            py="3"
            pl="15px"
          >
            <AccordionButton justifyContent="space-between">
              <Link activeOptions={{ exact: nav.exact }} getActiveProps={() => ({ className: 'active' })} to={nav.to}>
                <HStack alignItems="center" color="inherit">
                  <nav.icon />
                  <Text color="inherit">{nav.title}</Text>
                </HStack>
              </Link>
              {!!nav.children?.length && <AccordionIcon />}
            </AccordionButton>
            {!!nav.children?.length && (
              <AccordionPanel pb="0">
                <List spacing="3">
                  {nav.children?.map((child) => (
                    <ListItem key={child.to} color="gray.500" pl="8">
                      <Link to={child.to}>{child.title}</Link>
                    </ListItem>
                  ))}
                </List>
              </AccordionPanel>
            )}
          </AccordionItem>
        ))}
      </Accordion>
      <Center mt="auto">
        <Button
          onClick={() => signOut()}
          size="lg"
          sx={{ svg: { w: '20px', h: '20px' } }}
          variant="outline"
          leftIcon={<RiLogoutBoxLine />}
          colorScheme="red"
          mt="auto"
        >
          Logout
        </Button>
      </Center>
    </Flex>
  );
};

export default Sidebar;
