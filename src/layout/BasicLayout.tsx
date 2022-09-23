import { IMyRouteObject, routes } from '@/routes';
import { Layout, Menu, MenuProps } from 'antd';
import { Link, Outlet, useNavigate, NavigateFunction } from 'react-router-dom';
import type { ItemType }  from 'rc-menu/lib/interface'
import { useMemo } from 'react';

function getMenuItems(navigate: NavigateFunction, routes?: IMyRouteObject[]): ItemType[] {
    const items: ItemType[] = []

    routes?.forEach(route => {
        
    })



    return items
}

function getMenuItem({path, hideInMenu, icon, label, children}: IMyRouteObject, navigate: NavigateFunction): ItemType | null { 
    if (hideInMenu || (!label && (children == undefined || children.length === 0))) return null;

    return {label, itemIcon: icon, key: path || '11', onClick: path ? () => navigate(path): undefined, children: getMenuItems(children, navigate)}
}

export function BasicLayout() {
    const navigate = useNavigate()
    const menuItems = useMemo(() => getMenuItems(navigate, routes), [navigate])

    return (
        <Layout style={{ height: '100vh' }}>
            <Layout.Header>header</Layout.Header>
            <Layout>
                <Layout.Sider>
                    <Menu
                        mode="inline"
                        theme='dark'
                        items={menuItems}
                    />
                </Layout.Sider>
                <Layout.Content style={{ padding: '24px 16px' }}>
                    <Outlet />
                </Layout.Content>
            </Layout>
        </Layout>
    );
}
