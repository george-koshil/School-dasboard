import { lazy } from 'react';

export const routes = [
  {
    name: 'Учні',
    path: '/students',
    component: lazy(() => import('../pages/StudentsInfoPage/StudentsInfoPage')),
  },
  {
    name: 'Викладачі',
    path: '/teachers',
    component: lazy(() => import('../pages/TeachersInfoPage/TeachersInfoPage')),
  },
  {
    name: 'Предмети',
    path: '/lessons',
    component: lazy(() => import('../pages/LessonsInfoPage/LessonsInfoPage')),
  },
  {
    name: 'Пропуск занятть',
    path: '/attendance',
    component: lazy(() => import('../pages/AttendancePage/AttendancePage')),
  },
]