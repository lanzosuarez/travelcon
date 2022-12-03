import { InputGroup, Input, InputRightElement } from "@chakra-ui/react";
import React from "react";
import { RiSearchLine } from "react-icons/ri";

export const TextFilter = () => {
  return (
    <InputGroup>
      <Input bgColor="white" type="text" placeholder="Search here..." />
      <InputRightElement
        pointerEvents="none"
        children={<RiSearchLine color="gray.300" />}
      />
    </InputGroup>
  );
};
