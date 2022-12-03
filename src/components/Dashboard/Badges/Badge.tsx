import { Stack, Box, Text } from "@chakra-ui/react";
import { FC } from "react";
import { RiMedalFill } from "react-icons/ri";

// type Variant = "gold" | "silver" | "bronze";

const colors = {
  bronze: "#804A00",
  gold: "#FFBF00",
  silver: "#BCBCBC",
} as const;

type Variant = keyof typeof colors;

export const Badge: FC<{ variant: Variant; text: string }> = ({
  variant,
  text,
}) => (
  <Stack maxW="80px" alignItems="center">
    <Box
      color={colors[variant]}
      sx={{
        svg: {
          w: "47px",
          h: "63px",
        },
      }}
    >
      <RiMedalFill />
    </Box>
    <Text
      textAlign="center"
      wordBreak="break-word"
      color="gray.500"
      fontSize="xs"
    >
      {text}
    </Text>
  </Stack>
);
