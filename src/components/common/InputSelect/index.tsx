import {
  Box,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Popover,
  PopoverBody,
  PopoverContent,
  useBoolean,
  Text,
  HStack,
} from '@chakra-ui/react';
import React, { ComponentProps, FC, PropsWithChildren } from 'react';
import { MdExpandMore } from 'react-icons/md';
import { RiCheckLine, RiSearchLine } from 'react-icons/ri';
import { useClickAway } from 'react-use';

const options = ['Pons', 'Bench'];

export const InputSelect: FC<ComponentProps<typeof Input> & PropsWithChildren> = (props) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [value, setValue] = React.useState('');
  const [focused, { toggle, off, on }] = useBoolean(false);

  useClickAway(inputRef, () => off());

  return (
    <Box pos="relative">
      <InputGroup>
        <Input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          ref={(ref) => {
            if (ref) inputRef.current = ref;
          }}
          onClick={() => on()}
          bgColor="white"
          type="text"
          placeholder="Search here..."
        />
        <InputRightElement
          pointerEvents="none"
          children={focused ? <RiSearchLine color="gray.100" /> : <MdExpandMore color="gray.300" />}
        />
      </InputGroup>
      <Popover
        onClose={() => {
          console.log('here');
          inputRef?.current?.focus();
        }}
        isOpen={focused}
        offset={[100, 100]}
        initialFocusRef={inputRef}
      >
        <PopoverContent width={inputRef.current?.clientWidth} top={inputRef.current?.clientHeight! + 9}>
          <PopoverBody p="1">
            <List spacing={1}>
              {options
                .filter((option) => option.indexOf(value) > -1)
                .map((option) => (
                  <ListItem
                    borderRadius="md"
                    onClick={() => {
                      off();
                      setValue(option);
                    }}
                    bgColor={option === value ? 'gray.100' : ''}
                    _hover={{ bgColor: 'gray.100' }}
                    p="2"
                  >
                    <HStack pos="relative">
                      <Image
                        boxSize="2rem"
                        borderRadius="full"
                        src="https://placekitten.com/100/100"
                        alt="Fluffybuns the destroyer"
                        mr="12px"
                      />
                      <Text>{option}</Text>
                    </HStack>
                  </ListItem>
                ))}
            </List>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
