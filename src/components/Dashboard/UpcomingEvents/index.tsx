import { Card, CardHeader } from "@/components/common/DashboardCard";
import { Events } from "./Events";

export const UpcomingEvents = () => {
  return (
    <Card spacing="5">
      <CardHeader title="Upcoming Events" />
      <Events />
    </Card>
  );
};
