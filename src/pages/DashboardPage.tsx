import {
  Badges,
  EarningAnalytics,
  Reviews,
  Schedules,
  TopEvents,
  TopOrganizers,
  Totals,
  UpcomingEvents,
} from "@/components";
import { HStack, Stack } from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <HStack alignItems="flex-start" spacing="4">
      <Stack spacing="4">
        <Totals />
        <EarningAnalytics />
        <HStack spacing="4" alignItems="flex-start">
          <Stack flex="1" spacing="4">
            <TopEvents />
            <Badges />
          </Stack>
          <Stack flex="1" spacing="4">
            <Reviews />
            <TopOrganizers />
          </Stack>
        </HStack>
      </Stack>
      <Stack spacing="4">
        <Schedules />
        <UpcomingEvents />
      </Stack>
    </HStack>
  );
};

export default Dashboard;
