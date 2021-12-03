import Dashboard from '@views/dashboard/Dashboard';
import Main from '@views/dashboard/Main';
import Details from '@views/dashboard/Details';

const dashboard = [
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: '/dashboard/main',
    component: Dashboard,
    children: [
      {
        path: 'main',
        component: Main,
      },
      {
        path: 'details',
        component: Details,
      },
    ],
  },
];

export default dashboard;
