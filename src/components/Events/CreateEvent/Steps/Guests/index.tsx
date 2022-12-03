import { DateRangePicker } from '@/components/common';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { RiCalendar2Line } from 'react-icons/ri';
import { useEffectOnce } from 'react-use';
import { GuestsFormData, SchedulesFormData } from '../../types';
import { addPackage } from '../Packages/store';

export const Guests = () => {
  const {
    control,
    register,
    formState: { errors },
    setValue,
  } = useFormContext<GuestsFormData>();
  const { fields, update } = useFieldArray({
    name: 'discounts',
    control,
    rules: {
      required: 'Please add some shedules',
    },
  });

  useEffectOnce(() => {
    setValue('downpayment', 0);
    ['Infants', 'Seniors', 'PWD'].forEach((guestType, index) => {
      update(index, { discount: '0', guestType });
    });
  });

  return (
    <Stack spacing="6">
      <FormControl>
        <FormLabel>Donwpayment</FormLabel>
        <InputGroup>
          <InputLeftAddon children="Php" />
          <Input
            placeholder="e.g 1000 php"
            id="downpayment"
            {...register('downpayment', {
              required: 'This field is required',
            })}
          />
        </InputGroup>
        <FormHelperText>Guests will be required to pay full amount if left blank</FormHelperText>
        {errors.downpayment && <FormErrorMessage>{errors?.downpayment?.message}</FormErrorMessage>}
      </FormControl>
      <Stack spacing="5">
        {fields.map((field, index) => (
          <HStack key={field.id} spacing="5">
            <FormControl flex="1">
              <FormLabel>Guest Type</FormLabel>
              <Input
                readOnly
                {...register(`discounts.${index}.guestType`, {
                  required: 'This field is required',
                })}
                type="string"
              />
            </FormControl>
            <FormControl isInvalid={!!errors?.discounts?.[index]?.discount} flex="1">
              <FormLabel>Discount</FormLabel>
              <Input
                placeholder="e.g 100php, 20%, or 30%"
                type="string"
                {...register(`discounts.${index}.discount`, {
                  required: 'This field is required',
                })}
              />
            </FormControl>
          </HStack>
        ))}
      </Stack>
    </Stack>
  );
};
