import { Flex, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { RiArrowRightUpLine, RiArrowRightDownLine } from "react-icons/ri";
import { NumericFormat } from "react-number-format";

export const TotalCard: FC<{
  bg: string;
  title: string;
  value: number;
  percentage: number;
  dir?: "up" | "down";
}> = ({ bg, percentage, title, value, dir }) => {
  return (
    <Stack bg={bg} color="white" w="251px" borderRadius="md" px="4" py="3">
      <Heading fontWeight="normal" fontSize="md">
        {title}
      </Heading>
      <Flex justifyContent="space-between">
        <Text fontWeight="semibold">
          <NumericFormat
            prefix="Php "
            value={value}
            displayType="text"
            thousandSeparator
          />
        </Text>
        <HStack alignItems="center">
          {dir ? (
            dir === "up" ? (
              <RiArrowRightUpLine />
            ) : (
              <RiArrowRightDownLine />
            )
          ) : null}
          <Text fontSize="sm">
            <NumericFormat
              prefix="Php "
              displayType="text"
              value={percentage}
              suffix="%"
            />
          </Text>
        </HStack>
      </Flex>
    </Stack>
  );
};
