import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';

export const DateRangePicker: FC<{
  defaultValue?: DateRange;
  isOpen: boolean;
  onClose: () => void;
  onApply: (dateRange?: DateRange) => void;
}> = ({ isOpen, onClose, onApply, defaultValue = { from: new Date(), to: new Date() } }) => {
  const [selectedDates, setSelectedDates] = React.useState<DateRange | undefined>(defaultValue);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="gray.900" fontSize="md">
          Select a date range
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          pt="0"
          sx={{
            '.rdp-caption_label,.rdp-head_cell, .rdp-day.rdp-day_today': {
              fontWeight: 'semibold',
            },
            '.rdp-day.rdp-day_today': {
              color: 'blue.900',
            },
            '.rdp-day_selected': {
              bg: 'blue.500',
            },
          }}
        >
          <DayPicker mode="range" selected={selectedDates} onSelect={(selected) => setSelectedDates(selected)} />
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              onApply(selectedDates);
              onClose();
            }}
          >
            Apply
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
