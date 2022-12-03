import { Rating } from "@/components/common";
import { Card, CardHeader } from "@/components/common/DashboardCard";
import { Box, Button, HStack, Progress, Stack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { RiArrowDropRightLine } from "react-icons/ri";

const ReviewBar: FC<{
  title: string;
  progress: number;
  colorScheme: "green" | "blue" | "yellow" | "orange" | "red";
}> = ({ title, progress, colorScheme }) => (
  <HStack spacing="4">
    <Text color="gray" w="80px">
      {title}
    </Text>
    <Box flex="1">
      <Progress
        borderRadius="20px"
        colorScheme={colorScheme}
        size="lg"
        value={progress}
      />
    </Box>
  </HStack>
);

export const Reviews = () => {
  return (
    <Card>
      <CardHeader
        title="Guest Reviews"
        action={
          <Button
            sx={{
              svg: {
                w: "20px",
                h: "20px",
              },
            }}
            rightIcon={<RiArrowDropRightLine />}
            colorScheme="gray.500"
            variant="link"
            color="gray"
          >
            <Text fontWeight="light" fontSize="sm">
              This Month
            </Text>
          </Button>
        }
      />
      <Rating rating={4.9} size="lg" />
      <Stack spacing={3}>
        <ReviewBar title="Excellent" colorScheme="green" progress={85} />
        <ReviewBar title="Good" colorScheme="blue" progress={60} />
        <ReviewBar title="Enough" colorScheme="yellow" progress={30} />
        <ReviewBar title="Bad" colorScheme="orange" progress={20} />
        <ReviewBar title="Poor" colorScheme="red" progress={5} />
      </Stack>
      <Button colorScheme="blue" variant="link" size="sm" fontWeight="light">
        See all reviews
      </Button>
    </Card>
  );
};
