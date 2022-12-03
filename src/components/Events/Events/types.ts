export type Event = {
  name: string;
  location: string;
  schedules: number;
  guests: number;
  totalEarnings: number;
  reviews: number;
  status: "active" | "inactive";
  rating: number;
};

export type View = "table" | "grid";
