import { InputSelect } from '@/components/common';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Tag,
  TagCloseButton,
  Textarea,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { BasicInfoFormData } from '../../types';

export const BasicInfo = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
  } = useFormContext<BasicInfoFormData>();
  const titleValue = watch('title');
  const activityValue = watch('activities');
  const [activities, setActivities] = React.useState<string[]>([]);

  const hasActivitiesValidator = React.useCallback(
    () => activities.length > 0 || 'Add some event activities',
    [activities],
  );

  return (
    <form>
      <Stack spacing="6">
        {/* <FormControl isInvalid={!!errors.title}>
          <FormLabel>Coordinator</FormLabel>
          <InputSelect />
          {errors.title && <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>}
        </FormControl> */}
        <FormControl isInvalid={!!errors.title}>
          <FormLabel>Event Title</FormLabel>
          <InputGroup>
            <Input
              maxLength={50}
              id="title"
              {...register('title', {
                required: 'This field is required',
                maxLength: {
                  value: 50,
                  message: 'The maximumum length is 50 characters',
                },
              })}
            />
            <InputRightElement width="4.5rem" fontSize="xs">
              {titleValue?.length || 0} / 50
            </InputRightElement>
          </InputGroup>
          {errors.title && <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={!!errors.location}>
          <FormLabel>Location</FormLabel>
          <Input
            id="location"
            {...register('location', {
              required: 'This field is required',
            })}
          />
          {errors.location && <FormErrorMessage>{errors?.location?.message}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={!!errors.introduction}>
          <FormLabel>Event Introduction</FormLabel>
          <Textarea
            rows={10}
            resize="vertical"
            id="introduction"
            {...register('introduction', {
              required: 'This field is required',
            })}
          />
          {errors.introduction && <FormErrorMessage>{errors?.introduction?.message}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={!!errors.activities}>
          <FormLabel>Event Activities</FormLabel>
          <Input
            placeholder="Type and press 'Enter' to add activity"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setActivities((activities) => [...Array.from(new Set([...activities, activityValue]))]);
                if (errors?.activities?.type === 'hasActivities') {
                  clearErrors('activities');
                }
                setValue('activities', '');
              }
            }}
            id="activities"
            {...register('activities', {
              validate: {
                hasActivities: () => hasActivitiesValidator(),
              },
            })}
          />
          <FormHelperText>
            This helps your event be part of results when guests look for specific activity.
          </FormHelperText>
          {errors.activities && <FormErrorMessage>{errors?.activities?.message}</FormErrorMessage>}
          <Wrap mt="4">
            {activities.map((activity, index) => (
              <WrapItem key={index}>
                <Tag variant="solid" colorScheme="blue">
                  {activity}
                  <TagCloseButton
                    onClick={() =>
                      setActivities((activities) => activities.filter((activityItem) => activityItem !== activity))
                    }
                  />
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        </FormControl>
      </Stack>
    </form>
  );
};
