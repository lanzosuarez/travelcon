import { Button, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup } from '@chakra-ui/react';
import React, { ComponentProps, FC } from 'react';
import { MdExpandMore } from 'react-icons/md';

interface Props<T extends string> {
  filters: Record<T, string> & { All: '' };
  defaultValue: T;
  onChange: (value: T) => void;
  menuButtonProps?: ComponentProps<typeof MenuButton>;
}

export const StatusFilter = <T extends string>({ filters, onChange, defaultValue, menuButtonProps = {} }: Props<T>) => {
  const [statusFilter, setStatusFilter] = React.useState<keyof typeof filters>(defaultValue);

  return (
    <Menu autoSelect={false} placement="bottom-end">
      <MenuButton
        fontWeight="normal"
        color="gray.900"
        bg="white"
        w="170px"
        textAlign="left"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        variant="text"
        as={Button}
        rightIcon={<MdExpandMore />}
        {...menuButtonProps}
      >
        {statusFilter}
      </MenuButton>
      <MenuList>
        <MenuOptionGroup
          defaultValue={statusFilter}
          onChange={(e) => {
            setStatusFilter(e as T);
          }}
        >
          {Object.keys(filters).map((name) => (
            <MenuItemOption key={name} bg={statusFilter === name ? 'gray.100' : 'none'} value={name}>
              {name}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};
