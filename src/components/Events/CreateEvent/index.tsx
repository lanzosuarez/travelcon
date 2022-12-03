import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BasicInfo } from './Steps/BasicInfo';
import { Guests } from './Steps/Guests';
import { Packages } from './Steps/Packages';
import { Schedules } from './Steps/Schedules';
import { Step, Steps } from './Steps/Steps';
import { UploadImages } from './Steps/UploadImages';
import { useCreateEventSteps } from './store';
import {
  BasicInfoFormData,
  EventPackageFormData,
  GuestsFormData,
  SchedulesFormData,
  UploadImagesFormData,
} from './types';

interface CreateEventContainerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateEvent: FC<CreateEventContainerProps> = ({ isOpen, onClose }) => {
  const { step, incrementStep, decrementStep } = useCreateEventSteps(({ incrementStep, step, decrementStep }) => ({
    step,
    incrementStep,
    decrementStep,
  }));

  /**
   * Form instance of basic infos
   */
  const basicInfoForm = useForm<BasicInfoFormData>({ mode: 'onBlur' });

  /**
   * Form instance of upload images
   */
  const imagesForm = useForm<UploadImagesFormData>({ mode: 'onBlur' });
  /**
   * Form instance of packages
   */
  const packagesForm = useForm<EventPackageFormData>({ mode: 'onBlur' });
  /**
   * Form instance of schedules
   */
  const schedulesForm = useForm<SchedulesFormData>({ mode: 'onBlur' });
  /**
   * Form instance of guests
   */
  const guestsForm = useForm<GuestsFormData>({ mode: 'onBlur' });

  return (
    <Drawer onClose={onClose} isOpen={isOpen} size="xl">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader textAlign="center">Create Event</DrawerHeader>
        <DrawerBody>
          <Steps
            stepValidities={[
              basicInfoForm?.formState?.isDirty ? basicInfoForm?.formState?.isValid : undefined,
              imagesForm?.formState?.isDirty ? imagesForm?.formState?.isValid : undefined,
              packagesForm?.formState?.isDirty ? packagesForm?.formState?.isValid : undefined,
              schedulesForm?.formState?.isDirty ? schedulesForm?.formState?.isValid : undefined,
              guestsForm?.formState?.isDirty ? guestsForm?.formState?.isValid : undefined,
            ]}
          >
            <Step>
              <FormProvider {...basicInfoForm}>
                <BasicInfo />
              </FormProvider>
            </Step>
            <Step>
              <FormProvider {...imagesForm}>
                <UploadImages />
              </FormProvider>
            </Step>
            <Step>
              <FormProvider {...packagesForm}>
                <Packages />
              </FormProvider>
            </Step>
            <Step>
              <FormProvider {...schedulesForm}>
                <Schedules />
              </FormProvider>
            </Step>
            <Step>
              <FormProvider {...guestsForm}>
                <Guests />
              </FormProvider>
            </Step>
          </Steps>
        </DrawerBody>
        <DrawerFooter borderTopWidth="1px">
          <Button
            colorScheme="blue"
            variant="outline"
            mr={3}
            onClick={() => {
              if (step === 0) onClose();
              else decrementStep();
            }}
          >
            {step === 0 ? 'Cancel' : 'Back'}
          </Button>
          <Button
            onClick={() => {
              incrementStep();
              // if (step === 0) {
              //   basicInfoForm.handleSubmit((values) => {
              //     console.log(values);
              //     incrementStep();
              //   })();
              // }
            }}
            colorScheme="blue"
          >
            Next
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
