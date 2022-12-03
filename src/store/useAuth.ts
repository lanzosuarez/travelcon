import create from 'zustand';

interface User {
  name: string;
}

interface AuthState {
  user?: User;
  actions: {
    signIn: (user: User, cb?: () => void) => void;
    signOut: (cb?: () => void) => void;
  };
}

const useAuthStore = create<AuthState>((set) => ({
  user: {
    name: 'Pons',
  },
  actions: {
    signIn: (user: User, cb?: () => void) => {
      set({ user });
      cb?.();
    },
    signOut: (cb?: () => void) => {
      set({}, true);
      cb?.();
    },
  },
}));

export const useUser = () => useAuthStore((state) => state.user);
export const useAuthActions = () => useAuthStore((state) => state.actions);
