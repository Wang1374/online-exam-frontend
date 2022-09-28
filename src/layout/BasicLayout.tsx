import { getFlatRoutes, MyRouteObjectWithParent, routes } from '@/routes';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate, NavigateFunction, useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
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

function getMenuKeys(pathname: string): { openKeys: string[]; selectedKeys: string[] } {
    const flatRoutes = getFlatRoutes();
    const currentRoute = flatRoutes.find((route) => route.key === pathname);

    if (!currentRoute) {
        return { openKeys: [], selectedKeys: [] };
    }

    let selectedKeys: string[] = [currentRoute.key!];
    let openKeys: string[] = [];
    let parent = currentRoute.parent;
    while (parent) {
        const parentKey = parent.key!;
        parent.children.length > 0 ? openKeys.push(parentKey) : selectedKeys.push(parentKey);
        parent = parent.parent;
    }

    return { openKeys, selectedKeys };
}

export function BasicLayout() {
    const location = useLocation(); // 如果路由变化了，location就会变化
    const navigate = useNavigate();
    const menuItems = useMemo(() => getMenuItems(navigate, routes), [navigate]);
    const [seletedKeys, setSeletedKeys] = useState<string[]>([]);
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    // 监听路由的变化
    useEffect(() => {
        const pathname = location.pathname;
        const { selectedKeys, openKeys } = getMenuKeys(pathname);
        console.log(selectedKeys, openKeys)
        setSeletedKeys(selectedKeys);
        setOpenKeys(openKeys);
    }, [location]);

    return (
        <Layout style={{ height: '100vh' }}>
            <Layout.Header>header</Layout.Header>
            <Layout>
                <Layout.Sider>
                    <Menu
                        mode='inline'
                        theme='dark'
                        items={menuItems}
                        selectedKeys={seletedKeys}
                        openKeys={openKeys}
                        onOpenChange={setOpenKeys}
                    />
                </Layout.Sider>
                <Layout.Content style={{ padding: '24px 16px' }}>
                    <Outlet />
                </Layout.Content>
            </Layout>
        </Layout>
    );
}
