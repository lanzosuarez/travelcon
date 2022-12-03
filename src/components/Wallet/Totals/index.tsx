import { Flex, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { NumericFormat } from "react-number-format";
import { CurrentBalance } from "./CurrentBalance";
import { TotalExpenses } from "./TotalExpenses";
import { TotalIncome } from "./TotalIncome";

export const Totals = () => {
  return (
    <HStack spacing="4">
      <CurrentBalance />
      <TotalIncome />
      <TotalExpenses />
    </HStack>
  );
};
