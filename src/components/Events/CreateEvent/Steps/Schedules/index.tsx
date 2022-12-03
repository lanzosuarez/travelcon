import { DateRangePicker, InputSelect } from '@/components/common';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useBoolean,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { FC } from 'react';
import { Controller, FieldArrayWithId, useFieldArray, useFormContext } from 'react-hook-form';
import { RiAddLine, RiCalendar2Line, RiDeleteBin7Line } from 'react-icons/ri';
import { SchedulesFormData } from '../../types';

const formatDateRange = ({ from, to }: SchedulesFormData['schedules'][0]['schedule']) =>
  `${format(from, 'd MMM yyyy')} - ${format(to, 'd MMM yyyy')}`;

const Schedule: FC<{
  field: FieldArrayWithId<SchedulesFormData, 'schedules', 'id'>;
  index: number;
}> = ({ index, field }) => {
  const [showCalendar, { toggle }] = useBoolean(false);
  const {
    register,
    formState: { errors },
    control,
    setValue,
  } = useFormContext<SchedulesFormData>();

  return (
    <Stack spacing="5">
      <HStack>
        <FormControl isInvalid={!!errors?.schedules?.[index]?.schedule} flex="1">
          <FormLabel>Dates</FormLabel>
          <InputGroup>
            <Controller
              defaultValue={field.schedule}
              control={control}
              name={`schedules.${index}.schedule`}
              render={({ field }) => <Input type="string" {...field} value={formatDateRange(field.value)} />}
            />

            <InputRightElement>
              <IconButton
                icon={<RiCalendar2Line />}
                aria-label="show calendar"
                h="1.75rem"
                size="sm"
                onClick={() => toggle()}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl isInvalid={!!errors?.schedules?.[index]?.joiners} flex="1">
          <FormLabel>Maximum Joiners</FormLabel>
          <InputGroup>
            <Input
              type="number"
              {...register(`schedules.${index}.joiners`, {
                required: 'This field is required',
                valueAsNumber: true,
              })}
            />
          </InputGroup>
        </FormControl>
        <DateRangePicker
          defaultValue={field.schedule}
          onApply={(dateRange) => {
            if (dateRange?.from && dateRange?.to) {
              setValue(`schedules.${index}.schedule`, {
                from: dateRange.from!,
                to: dateRange.to!,
              });
            }
          }}
          isOpen={showCalendar}
          onClose={() => toggle()}
        />
      </HStack>
      <Box w="100%">
        <FormControl isInvalid={!!errors?.schedules?.[index]?.schedule} flex="1">
          <FormLabel>Coordinator</FormLabel>
          <Controller
            defaultValue={field.coordinator}
            control={control}
            name={`schedules.${index}.coordinator`}
            render={({ field }) => {
              return <InputSelect />;
            }}
          />
        </FormControl>
      </Box>
    </Stack>
  );
};

export const Schedules = () => {
  const {
    control,
    register,
    formState: { errors },
    watch,
  } = useFormContext<SchedulesFormData>();
  const { remove, update, fields, append } = useFieldArray({
    name: 'schedules',
    control,
    rules: {
      required: 'Please add some shedules',
    },
  });
  return (
    <Stack spacing="6">
      <Box>
        <Button
          onClick={() =>
            append({
              joiners: 0,
              schedule: { from: new Date(), to: new Date() },
            })
          }
          colorScheme="blue"
          leftIcon={<RiAddLine />}
        >
          Add Schedule
        </Button>
      </Box>
      <Stack spacing="5">
        {fields.map((field, index) => (
          <Stack spacing="5">
            <Box flex="1">
              <Schedule key={field.id} field={field} index={index} />
            </Box>
            <Flex justifyContent="flex-end">
              <Button onClick={() => remove(index)} colorScheme="red">
                Remove
              </Button>
            </Flex>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
