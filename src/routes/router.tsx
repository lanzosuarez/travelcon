import { RequireAuth } from '@/components';
import { ErrorPage, Loading } from '@/components/common';
import { Navigate, Route } from '@tanstack/react-location';
import React, { FC, lazy, PropsWithChildren, Suspense } from 'react';
import DashboardRootLayout from './DashboardRoot';
import { LocationGenerics } from './types';
import WalletRoot from './WalletRoot';

const Suspended: FC<PropsWithChildren<{ fallback?: React.ReactNode }>> = ({ children, fallback }) => (
  <Suspense fallback={fallback || <Loading variant="full" />}>{children}</Suspense>
);

export const routes: Route<LocationGenerics>[] = [
  {
    path: '/',
    element: <Navigate to="login" />,
  },
  {
    path: 'login',
    element: () => import('@/pages/LoginPage').then((res) => <res.default />),
    errorElement: <ErrorPage />,
  },
  {
    path: 'register',
    element: () => import('@/pages/RegisterPage').then((res) => <res.default />),
    errorElement: <ErrorPage />,
  },
  {
    path: 'dashboard',
    element: (
      <Suspended>
        <RequireAuth>
          <DashboardRootLayout />
        </RequireAuth>
      </Suspended>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: () => import('@/pages/DashboardPage').then((res) => <res.default />),
        pendingElement: <Loading h="200px" variant="sm" />,
      },
      {
        path: 'events',
        element: () => import('@/pages/EventsPage').then((res) => <res.default />),
        pendingElement: <Loading h="200px" variant="sm" />,
        children: [
          {
            path: '/',
            element: () => import('@/components/Events/Events').then((res) => <res.default />),
            searchFilters: [
              (search) => ({
                ...search,
                view: search.view || 'table',
                pageIndex: search.pageIndex || 0,
                pageSize: search.pageSize || 10,
                sort: search.sort || 'asc',
                sortBy: search.sortBy || 'totalEarnings',
              }),
            ],
            pendingElement: <Loading h="200px" variant="sm" />,
          },
          {
            path: 'schedules',
            element: () => import('@/components/Schedules/Schedules').then((res) => <res.default />),
            searchFilters: [
              (search) => ({
                ...search,
                view: search.view || 'table',
                pageIndex: search.pageIndex || 0,
                pageSize: search.pageSize || 10,
                sort: search.sort || 'asc',
                sortBy: search.sortBy || 'totalEarnings',
              }),
            ],
            pendingElement: <Loading h="200px" variant="sm" />,
          },
        ],
      },
      {
        path: 'wallet',
        element: <WalletRoot />,
        children: [
          {
            path: '/',
            element: () => import('@/pages/WalletPage').then((res) => <res.default />),
            pendingElement: <Loading h="200px" variant="sm" />,
          },
          {
            path: 'transactions',
            element: () => import('@/pages/TransactionsPage').then((res) => <res.default />),
            pendingElement: <Loading h="200px" variant="sm" />,
          },
          {
            path: 'accounts',
            element: 'accounts',
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: () => import('@/components/common').then((res) => <res.NotFoundPage />),
  },
];
