import { Box } from "@chakra-ui/react";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    earning: 1300,
  },
  {
    name: "Feb",
    earning: 100,
  },
  {
    name: "Mar",
    earning: 200,
  },
  {
    name: "Apr",
    earning: 400,
  },
  {
    name: "May",
    earning: 3000,
  },
  {
    name: "June",
    earning: 324,
  },
  {
    name: "July",
    earning: 3252,
  },
  {
    name: "Aug",
    earning: 3232,
  },
  {
    name: "Sep",
    earning: 1234,
  },
  {
    name: "Oct",
    earning: 567,
  },
  {
    name: "Nov",
    earning: 3333,
  },
  {
    name: "Dec",
    earning: 4000,
  },
];

export const AnalyticsChart = () => {
  return (
    <Box h="300px">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            name="Earnings"
            type="monotone"
            dataKey="earning"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};
