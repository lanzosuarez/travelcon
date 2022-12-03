import { StatusFilter } from '@/components/common';
import { useMatchRoute } from '@tanstack/react-location';
import React from 'react';

const eventsStatusFilters = {
  All: '',
  Active: 'active',
  Inactive: 'inactive',
} as const;

const eventScheduleStatusFilters = {
  All: '',
  Completed: 'completed',
  Ongoing: 'ongoing',
  Open: 'open',
} as const;

type EventFilters = keyof typeof eventsStatusFilters;
type EventScheduleFilters = keyof typeof eventScheduleStatusFilters;

export const CommonStatusFilters = () => {
  const matchedRoute = useMatchRoute();
  const isSchedules = matchedRoute({ to: 'schedules' });

  return isSchedules ? (
    <StatusFilter<EventScheduleFilters>
      filters={eventScheduleStatusFilters}
      defaultValue="All"
      onChange={(value) => {
        console.log(value);
      }}
      menuButtonProps={{
        w: 220,
      }}
    />
  ) : (
    <StatusFilter<EventFilters>
      filters={eventsStatusFilters}
      defaultValue="All"
      onChange={(value) => {
        console.log(value);
      }}
    />
  );
};
