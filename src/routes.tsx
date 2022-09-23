import { RouteObject } from 'react-router-dom';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { Result } from 'antd';
import { ResetPassword } from './pages/ResetPassword';
import { Home } from './pages/Home';
import { BasicLayout } from './layout/BasicLayout';

export interface IMyRouteObject extends RouteObject {
    key?: string
    label?: string; // 默认行为，如果不设置label，则不展示在Menu菜单里，
    hideInMenu?: boolean;
    icon?: React.ReactNode;
    children?: IMyRouteObject[]
}

export const routes: IMyRouteObject[] = [
    {
        path: '/',
        element: <BasicLayout />,
        children: [
            {
                label: '系统设置',
                children: [
                    { path: 'home', element: <h2>home page </h2> },
                    { path: 'user', element: <h2>use page </h2> },
                ],
            },
        ],
    },
    { path: '/login',  element: <Login /> },
    { path: '/register', hideInMenu: true, element: <Register /> },
    { path: '/reset-password', hideInMenu: true, element: <ResetPassword /> },
    { path: '*', hideInMenu: true, element: <Result status='404' title='404' /> },
];
