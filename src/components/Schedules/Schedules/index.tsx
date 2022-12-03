import { Loading } from '@/components/common';
import { LocationGenerics } from '@/routes';
import { Box } from '@chakra-ui/react';
import { useSearch } from '@tanstack/react-location';
import { lazy, Suspense } from 'react';

const SchedulesTable = lazy(() => import('../SchedulesTable'));
const ScheduleAssignment = lazy(() => import('../ScheduleAssignment'));

const Schedules = () => {
  const { scheduleAssignment } = useSearch<LocationGenerics>();
  return (
    <Box pt="6">
      <Suspense fallback={<Loading variant="sm" />}>
        <SchedulesTable />
      </Suspense>
      <Suspense fallback={<Loading variant="sm" />}>
        {scheduleAssignment && <ScheduleAssignment scheduleId={scheduleAssignment} />}
      </Suspense>
    </Box>
  );
};

export default Schedules;
