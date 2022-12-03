import { LocationGenerics } from '@/routes';
import { Tabs, TabList, Tab, Badge, TabPanels, Stack, Tooltip } from '@chakra-ui/react';
import { useMatchRoute, Outlet, useNavigate } from '@tanstack/react-location';
import React from 'react';

export const EventsTab = () => {
  const navigate = useNavigate<LocationGenerics>();
  const matchedRoute = useMatchRoute();
  const isSchedules = matchedRoute({ to: 'schedules' });
  return (
    <Tabs
      defaultIndex={isSchedules ? 1 : 0}
      isLazy
      onChange={(tab) => {
        if (tab === 0) {
          navigate({ to: '' });
          return;
        }
        navigate({ to: 'schedules' });
      }}
    >
      <TabList>
        <Tab color="gray.900" fontWeight="semibold">
          Events
          <Tooltip label="No. of active events">
            <Badge ml="4" colorScheme="green" variant="subtle">
              16
            </Badge>
          </Tooltip>
        </Tab>
        <Tab color="gray.900" fontWeight="semibold">
          Schedules
        </Tab>
      </TabList>
      <TabPanels>
        <Stack>
          <Outlet />
        </Stack>
      </TabPanels>
    </Tabs>
  );
};
