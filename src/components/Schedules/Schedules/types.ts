export type EventSchedule = {
  id: string;
  eventName: string;
  schedule: string;
  booked: number;
  paid: number;
  toCollect: number;
  totalEarnings: number;
  status: 'completed' | 'ongoing' | 'open' | 'upcoming';
};

export type View = 'table' | 'grid';
