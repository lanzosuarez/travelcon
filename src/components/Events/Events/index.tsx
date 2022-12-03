import { Loading } from '@/components/common';
import { LocationGenerics } from '@/routes';
import { Box, Flex, Stack } from '@chakra-ui/react';
import { useNavigate, useSearch } from '@tanstack/react-location';
import { lazy, Suspense } from 'react';
import { ViewToggle } from './ViewToggle';

const EventsList = lazy(() => import('../EventsList'));
const EventsTable = lazy(() => import('../EventsTable'));

const Events = () => {
  const search = useSearch<LocationGenerics>();
  const navigate = useNavigate<LocationGenerics>();
  return (
    <Stack>
      <Flex justifyContent="flex-end">
        <ViewToggle
          key={search.view!}
          defaultView={search.view!}
          onViewChange={(view) => {
            navigate({
              search: (old) => ({
                ...old,
                view,
              }),
            });
          }}
        />
      </Flex>
      <Suspense fallback={<Loading variant="sm" />}>
        <Box>{search.view === 'table' && <EventsTable />}</Box>
        <Box>{search.view === 'grid' && <EventsList />}</Box>
      </Suspense>
    </Stack>
  );
};

export default Events;
