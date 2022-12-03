import create from "zustand";

interface CreateEventStepsState {
  step: number;
  incrementStep: () => void;
  decrementStep: () => void;
  setStep: (step: number) => void;
}

export const useCreateEventSteps = create<CreateEventStepsState>((set) => ({
  step: 0,
  incrementStep: () => set((state) => ({ step: state.step + 1 })),
  decrementStep: () => set((state) => ({ step: state.step - 1 })),
  setStep: (step: number) => set(() => ({ step })),
}));

interface CreateEventFormStates {
  isBasicInfoValid: boolean;
}

export const useCreateEventFormStates = create<CreateEventFormStates>(
  (set) => ({
    isBasicInfoValid: false,
  })
);
