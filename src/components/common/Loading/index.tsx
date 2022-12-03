import { Flex, Spinner } from "@chakra-ui/react";
import { ComponentProps, FC } from "react";

type Variant = "full" | "sm";
const sizes: Record<Variant, string> = {
  full: "100vh",
  sm: "200px",
};

export const Loading: FC<
  ComponentProps<typeof Flex> & { variant: Variant }
> = ({ variant, ...props }) => {
  return (
    <Flex
      {...props}
      h={sizes[variant]}
      alignItems="center"
      justifyContent="center"
    >
      <Spinner />
    </Flex>
  );
};
