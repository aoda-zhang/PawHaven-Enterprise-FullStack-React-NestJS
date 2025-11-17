import type { ReactElement } from 'react';
import { lazy } from 'react';

import ErrorFallback from '@/components/ErrorFallback';
// import GuardRoute from '@/components/GuardRoute';
import NotFund from '@/components/NotFund';
import Login from '@/features/Auth/Login';
import Register from '@/features/Auth/Register';
import Home from '@/features/Home';
import RootLayout from '@/layout';

const ReportStray = lazy(() => import('@/features/ReportStray'));
const ReportDetail = lazy(() => import('@/features/RescueDetail'));
const RescueGuide = lazy(() => import('@/features/RescueGuide'));

const routerElementMapping: Record<string, ReactElement> = {
  // guardRoute: (
  //   <GuardRoute>
  //     <RootLayout />
  //   </GuardRoute>
  // ),
  rootLayout: <RootLayout />,
  home: <Home />,
  auth_login: <Login />,
  auth_register: <Register />,
  report_stray: <ReportStray />,
  rescue_guides: <RescueGuide />,
  rescue_detail: <ReportDetail />,
  notFund: <NotFund />,
  errorFallback: <ErrorFallback />,
};

export default routerElementMapping;
