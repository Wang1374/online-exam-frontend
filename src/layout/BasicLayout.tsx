import { IMyRouteObject } from '@/routes';
import { Layout, Menu, MenuProps } from 'antd';
import { Link, Outlet } from 'react-router-dom';

// function getMenuItems(routes: IMyRouteObject): MenuProps['items'] {

// }

export function BasicLayout() {
    return (
        <Layout style={{ height: '100vh' }}>
            <Layout.Header>header</Layout.Header>
            <Layout>
                <Layout.Sider>
                    <Menu theme='dark'>
                        <Menu.Item>
                            <Link to='/home'>shouye</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to='/user'>user</Link>
                        </Menu.Item>
                    </Menu>
                </Layout.Sider>
                <Layout.Content style={{padding: '24px 16px'}}>
                    <Outlet />
                </Layout.Content>
            </Layout>
        </Layout>
    );
}
