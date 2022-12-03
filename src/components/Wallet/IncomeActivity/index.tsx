import { Card, CardHeader } from "@/components/common/DashboardCard";
import { Box, HStack, Select, Text } from "@chakra-ui/react";
import { AnalyticsChart } from "./IncomeActivityChart";

export const IncomeActivity = () => {
  return (
    <Card>
      <CardHeader
        title={
          <HStack spacing="4">
            <Text>Income Activities</Text>
          </HStack>
        }
        action={
          <Select size="sm" color="gray" defaultValue="option1" w="100px">
            <option value="option1">2022</option>
            <option value="option2">2021</option>
            <option value="option3">2020</option>
          </Select>
        }
      />
      <Box>
        <AnalyticsChart />
      </Box>
    </Card>
  );
};
