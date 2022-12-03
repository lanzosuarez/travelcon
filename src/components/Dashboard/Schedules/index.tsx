import { Card, CardHeader } from "@/components/common/DashboardCard";
import { Box } from "@chakra-ui/react";
import React from "react";
import { DayPicker } from "react-day-picker";

export const Schedules = () => {
  return (
    <Card>
      <CardHeader title="Schedules" />
      <Box
        sx={{
          ".rdp-caption_label,.rdp-head_cell, .rdp-day.rdp-day_today": {
            fontWeight: "semibold",
          },
          ".rdp-day.rdp-day_today": {
            color: "blue.500",
          },
        }}
      >
        <DayPicker />
      </Box>
    </Card>
  );
};
