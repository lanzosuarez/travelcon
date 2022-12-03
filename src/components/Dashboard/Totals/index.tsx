import { HStack } from '@chakra-ui/react';
import { RiCalendar2Line, RiTeamLine, RiWalletLine } from 'react-icons/ri';
import { TotalCard } from './common';

export const Totals = () => {
  return (
    <HStack
      spacing="4"
      sx={{
        svg: {
          width: '30px',
          height: '30px',
        },
      }}
    >
      <TotalCard title="Completed Schedules" icon={<RiCalendar2Line />} total="5,502" />
      <TotalCard title="Total Bookings" icon={<RiTeamLine />} total="500,431" />
      <TotalCard title=" Total Earnings" icon={<RiWalletLine />} total="Php 95,850" />
      <TotalCard title=" Completed Schedules" icon={<RiCalendar2Line />} total="5,502" />
    </HStack>
  );
};
