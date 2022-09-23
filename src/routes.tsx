import { RouteObject } from 'react-router-dom';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { Result } from 'antd';
import { ResetPassword } from './pages/ResetPassword';
import { Home } from './pages/Home';
import { BasicLayout } from './layout/BasicLayout';

export interface IMyRouteObject extends RouteObject {
    label?: string;
    hideInMenu?: boolean;
    icon?: React.ReactNode;
}

export const routes: IMyRouteObject[] = [
    {
        path: '/',
        element: <BasicLayout />,
        children: [
            { index: true, element: <h2>home page </h2> },
            { path: 'user', element: <h2>use page </h2> },
        ],
    },
    { path: '/login', hideInMenu: true, element: <Login /> },
    { path: '/register',hideInMenu: true, element: <Register /> },
    { path: '/reset-password',hideInMenu: true, element: <ResetPassword /> },
    { path: '*',hideInMenu: true, element: <Result status='404' title='404' /> },
];
