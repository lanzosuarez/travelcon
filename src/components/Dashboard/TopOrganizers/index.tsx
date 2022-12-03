import { Card, CardHeader } from "@/components/common/DashboardCard";
import { Button, Text } from "@chakra-ui/react";
import { RiArrowDropRightLine } from "react-icons/ri";
import { Organizers } from "./Organizers";

export const TopOrganizers = () => {
  return (
    <Card spacing="6">
      <CardHeader
        title="Top Organizers"
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
              View All
            </Text>
          </Button>
        }
      />
      <Organizers />
    </Card>
  );
};
