import { RouteObject } from 'react-router-dom';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { Result } from 'antd';
import { ResetPassword } from './pages/ResetPassword';
import { BasicLayout } from './layout/BasicLayout';
import { Home } from './pages/Home';
import { UserList } from './pages/UserList';

interface IMyRouteObject extends RouteObject {
    key?: string;
    label?: string; // 默认行为，如果不设置label，则不展示在Menu菜单里，
    hideInMenu?: boolean;
    icon?: React.ReactNode;
    children?: IMyRouteObject[];
}

export type MyRouteObjectWithParent = Omit<IMyRouteObject, 'children'> & {
    parent: MyRouteObjectWithParent | null;
    children: MyRouteObjectWithParent[];
};

const _routes: IMyRouteObject[] = [
    {
        path: '/',
        element: <BasicLayout />,
        children: [
            {
                label: '系统设置',
                key: 'system-setting',
                children: [
                    { path: 'home', label: '首页', element: <Home /> },
                    { path: 'user', label: '用户中心', element: <UserList /> },
                ],
            },
        ],
    },
    {
        path: '/a',
        element: <BasicLayout />,
        children: [
            {
                label: '系统设置2',
                key: 'system-setting1',
                children: [
                    { path: 'home', label: '首页2', element: <h2>home page </h2> },
                    { path: 'user', label: '用户中心2', element: <h2>use page </h2> },
                ],
            },
        ],
    },
    { path: '/login', hideInMenu: true, element: <Login /> },
    { path: '/register', hideInMenu: true, element: <Register /> },
    { path: '/reset-password', hideInMenu: true, element: <ResetPassword /> },
    { path: '*', hideInMenu: true, element: <Result status='404' title='404' /> },
];

function formatPath(path: string) {
    return path.startsWith('/') ? path : `/${path}`;
}
function getRouteKey(route: MyRouteObjectWithParent) {
    if (!route.path && !route.key) {
        throw new Error('path和key必须存在其一');
    }

    if (route.key) {
        return route.key;
    }

    let parentPaths: string[] = [];
    let parent = route.parent;
    while (parent) {
        const { path } = parent;
        path !== undefined && path !== '/' && parentPaths.push(formatPath(path));
        parent = parent.parent;
    }

    return parentPaths.reverse().join() + formatPath(route.path!);
}

function loopRoutes(routes: IMyRouteObject[], parent: MyRouteObjectWithParent | null = null) {
    routes.forEach((route) => {
        const _route = route as MyRouteObjectWithParent;
        _route.parent = parent;
        _route.key = getRouteKey(_route);
        if (route.children) {
            loopRoutes(route.children, _route);
        }
    });
}
loopRoutes(_routes);

export function getFlatRoutes(): MyRouteObjectWithParent[] {
    const flatRoutes: MyRouteObjectWithParent[] = []
    const loop = (routes: MyRouteObjectWithParent[]) => {
        routes.forEach(route => {
            flatRoutes.push(route)
            if (route.children) {
                loop(route.children)
            }
        })
    }
    loop(_routes as MyRouteObjectWithParent[])

    return flatRoutes
}

export const routes = _routes as MyRouteObjectWithParent[];
