import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Checkbox, Button, message, Space } from 'antd';
import encrypt from '@/utils/encrypt';
import { ApiUser } from '@/services/user';
import { ILoginReq } from '@/types/user';
import { ContainerCenter } from '@/components/ContainerCenter';
import { FormItemPassword } from '@/components/FormItemPassword';
import { FormItemPhone } from '@/components/FormItemPhone';

interface IFormValues extends ILoginReq {}

export function Login() {
    const navigate = useNavigate();

    const onFinish = (values: IFormValues) => {
        const phone = encrypt(values.phone);
        const password = encrypt(values.password);
        //encrypt 如果encrypt成功则返回string，如果失败则返回false，所以可以在if里面进行false
        if (phone === false || password === false) {
            message.error('加密失败');
            return;
        }

        ApiUser.login({ phone, password })
            .then((res) => {
                onLoginSuccess(phone, res.data.date);
            })
            .catch((err) => {
                message.error(err.message);
            });
    };

    const onLoginSuccess = (phone: string, token: string) => {
        message.success('登陆成功');
        localStorage.setItem('phone', phone);
        localStorage.setItem('token', token);
        navigate('/home');
    };

    return (
        <ContainerCenter style={{ height: '100vh', marginTop: -100 }}>
            <div style={{ width: 400 }}>
                <h3 style={{ padding: '24px 0', textAlign: 'center' }}>登录</h3>
                <Form<IFormValues>
                    name='basic'
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ phone: '18611304313', remember: true }}
                    onFinish={onFinish}
                    autoComplete='off'
                >
                    <FormItemPhone label='手机号'></FormItemPhone>
                    <FormItemPassword label='密码'></FormItemPassword>
                    <Form.Item name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                        <Space>
                            <Button type='primary' htmlType='submit'>
                                Submit
                            </Button>
                            <Button
                                onClick={() => {
                                    navigate('/reset-password');
                                }}
                            >
                                密码重置
                            </Button>
                            <Button
                                onClick={() => {
                                    navigate('/register');
                                }}
                            >
                                注册
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </ContainerCenter>
    );
}
