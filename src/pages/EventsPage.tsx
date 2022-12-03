import { CreateEvent } from '@/components';
import { EventsTab } from '@/components/Events/EventsTabs';
import { Filters } from '@/components/Events/Filters';
import { Box, Button, Stack } from '@chakra-ui/react';
import { RiAddLine } from 'react-icons/ri';
import { useBoolean } from 'react-use';

const EventsPage = () => {
  const [isCreateEventOpen, toggleCreateEvent] = useBoolean(false);
  return (
    <>
      <CreateEvent isOpen={isCreateEventOpen} onClose={() => toggleCreateEvent()} />
      <Stack spacing="5">
        <Box>
          <Button onClick={() => toggleCreateEvent()} leftIcon={<RiAddLine />} colorScheme="blue">
            Create new event
          </Button>
        </Box>
        <Filters />
        <EventsTab />
      </Stack>
    </>
  );
};

export default EventsPage;
