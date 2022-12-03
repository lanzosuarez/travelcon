export interface BasicInfoFormData {
  title: string;
  location: string;
  introduction: string;
  activities: string;
}

/**
 * Form data type of Event pacakges form
 *
 * @remarks Marking other fields as optional because initially only name is going to be available
 */
export interface EventPackageFormData {
  packages: {
    name: string;
    duration?: string;
    rate?: number;
    description?: string;
    inclusions?: String;
    itinerary?: string;
    exclusions?: string;
    note?: string;
  }[];
}

export interface AddPackageFormData {
  packageName: string;
}

export interface SchedulesFormData {
  schedules: {
    coordinator?: string;
    schedule: {
      from: Date;
      to: Date;
    };
    joiners: number;
  }[];
}

export interface UploadImagesFormData {
  images: {
    url: string;
  }[];
}

export interface GuestsFormData {
  downpayment: number;
  discounts: {
    guestType: string;
    discount: string;
  }[];
}
