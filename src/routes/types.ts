import { View } from '@/components/Events/Events/types';
import { MakeGenerics } from '@tanstack/react-location';
import { Event as EventType } from '@/components/Events/Events/types';

type RequireAuthSearch = {
  /**
   * The locatation where the user left of before being logged out
   */
  from: string;
};

type BasePageSearch = {
  pageSize: number;
  pageIndex: number;
  sort: 'asc' | 'desc';
  sortBy: Exclude<keyof EventType, 'status'>;
  startDate: Date;
  endDate: Date;
  text: string;
};

export type EventsPageSearch = BasePageSearch & {
  /**
   * View mode of the events
   */
  view: View;
};

export type SchedulePageSearch = BasePageSearch & {
  /**
   * Current selected event schedule for assignment, if this search param is present
   * open the assignment drawer
   */
  scheduleAssignment: string;
};

type Search = RequireAuthSearch & EventsPageSearch & SchedulePageSearch;

export type LocationGenerics = MakeGenerics<{
  Search: Search;
}>;
