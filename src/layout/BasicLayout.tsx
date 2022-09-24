import { MyRouteObjectWithParent, routes } from '@/routes';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate, NavigateFunction } from 'react-router-dom';
import { useMemo } from 'react';
import { ItemType, MenuItemGroupType } from 'antd/lib/menu/hooks/useItems';

function getMenuItems(navigate: NavigateFunction, routes?: MyRouteObjectWithParent[]): ItemType[] {
    const items: ItemType[] = [];

    routes?.forEach((route) => {
        // label 不存在，但是有children，需要将children提到父级展示
        if (!route.label && route.children?.length) {
            const _items = getMenuItems(navigate, route.children);
            items.push(..._items);
        } else {
            const item = getMenuItem(route, navigate);
            item && items.push(item);
        }
    });

    return items;
}

function getMenuItem(route: MyRouteObjectWithParent, navigate: NavigateFunction): ItemType | null {
    // 1. hideMenu
    if (route.hideInMenu) {
        return null;
    }

    // 2. label 不存在 且 没有children
    if (!route.label && (!route.children || route.children.length === 0)) {
        return null;
    }

    // 3. label 不存在，但是有children
    // 4. label存在
    const children = getMenuItems(navigate, route.children);
    const menuItem: ItemType = {
        label: route.label,
        key: route.key!,
        icon: route.icon,
        onClick: route.path ? () => navigate(route.path!) : () => {},
    };

    if (children.length) {
        (menuItem as MenuItemGroupType).children = children;
    }

    return menuItem;
}

export function BasicLayout() {
    const navigate = useNavigate();
    const menuItems = useMemo(() => getMenuItems(navigate, routes), [navigate]);
    console.log(menuItems)
    return (
        <Layout style={{ height: '100vh' }}>
            <Layout.Header>header</Layout.Header>
            <Layout>
                <Layout.Sider>
                    <Menu mode='inline' theme='dark' items={menuItems} />
                </Layout.Sider>
                <Layout.Content style={{ padding: '24px 16px' }}>
                    <Outlet />
                </Layout.Content>
            </Layout>
        </Layout>
    );
}
