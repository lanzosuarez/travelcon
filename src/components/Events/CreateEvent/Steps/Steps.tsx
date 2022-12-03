import { Box, Center, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { ComponentProps, FC, PropsWithChildren } from 'react';
import { RiErrorWarningFill, RiErrorWarningLine, RiCheckboxCircleFill } from 'react-icons/ri';
import { isNil } from 'remeda';
import { useCreateEventSteps } from '../store';

/**
 * Wrapper component for each step of the event creation
 */
export const Step: FC<PropsWithChildren & ComponentProps<typeof TabPanel>> = ({ children, ...props }) => (
  <TabPanel {...props}>{children}</TabPanel>
);

const Validity: FC<{ isValid?: boolean }> = ({ isValid }) => {
  if (!isNil(isValid)) {
    if (isValid)
      return (
        <Box sx={{ svg: { color: 'green.500' } }}>
          <RiCheckboxCircleFill />
        </Box>
      );

    return (
      <Box sx={{ svg: { color: 'red.500' } }}>
        <RiErrorWarningFill />
      </Box>
    );
  }
  return <></>;
};

/**
 * Container component for the Event Creation Step
 */
export const Steps: FC<
  PropsWithChildren<{
    stepValidities: (undefined | boolean)[];
  }>
> = ({ children, stepValidities }) => {
  const step = useCreateEventSteps(({ step }) => step);

  return (
    <Tabs isLazy index={step} defaultIndex={step} colorScheme="blue">
      <Center>
        <TabList>
          <Tab color="gray.900" fontWeight="normal">
            <HStack>
              <Text>Basic Info</Text>
              <Validity isValid={stepValidities?.[0]} />
            </HStack>
          </Tab>
          <Tab color="gray.900" fontWeight="normal">
            <HStack>
              <Text>Images</Text>
              <Validity isValid={stepValidities?.[1]} />
            </HStack>
          </Tab>
          <Tab color="gray.900" fontWeight="normal">
            <HStack>
              <Text>Packages</Text>
              <Validity isValid={stepValidities?.[2]} />
            </HStack>
          </Tab>
          <Tab color="gray.900" fontWeight="normal">
            <HStack>
              <Text>Schedules</Text>
              <Validity isValid={stepValidities?.[3]} />
            </HStack>
          </Tab>
          <Tab color="gray.900" fontWeight="normal">
            <HStack>
              <Text>Payment</Text>
              <Validity isValid={stepValidities?.[4]} />
            </HStack>
          </Tab>
        </TabList>
      </Center>
      <TabPanels px="6" pt="4">
        {children}
      </TabPanels>
    </Tabs>
  );
};
