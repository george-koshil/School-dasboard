import { lazy } from 'react';

export const routes = [
  {
    name: 'Home',
    path: '/',
    component: lazy(() => import('../pages/AttendancePage/AttendancePage')),
  },
  {
    name: 'Summary',
    path: '/summary',
    component: lazy(() => import('../pages/SummaryPage/SummaryPage')),
  },
  {
    name: 'About',
    path: '/about',
    component: lazy(() => import('../pages/AboutPage/AboutPage')),
  },
]