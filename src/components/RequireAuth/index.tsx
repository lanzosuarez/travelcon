import { useUser } from '@/store/useAuth';
import { Navigate, useResolvePath } from '@tanstack/react-location';
import { FC, PropsWithChildren } from 'react';

export const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
  const user = useUser();
  const resolvePath = useResolvePath();
  const from = resolvePath('.');
  if (!user) {
    // Redirect them to the /login page, but save the current location they were trying to go to when they were redirected. This allows us to send them along to that page after they login, which is a nicer user experience than dropping them off on the home page.
    return <Navigate to="/login" search={{ from }} replace />;
  }
  return <>{children}</>;
};
