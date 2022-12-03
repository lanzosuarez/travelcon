import AppHeader from '@/components/AppHeader';
import Sidebar from '@/components/Sidebar';
import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from '@tanstack/react-location';
import { FC } from 'react';

const DashboardRoot: FC = () => (
  <Flex minH="100vh">
    <Box pos="relative">
      <Sidebar />
    </Box>
    <Box flex="1" flexDir="column" bgColor="whiteAlpha.50" pos="relative">
      <AppHeader />
      <Box as="main" p="5" pl="12" flex="1" mt="80px" ml="250px">
        <Outlet />
      </Box>
    </Box>
  </Flex>
);

export default DashboardRoot;
