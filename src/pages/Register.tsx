import { Button, Form, Input, Radio } from 'antd';
import { MessageOutlined, UserOutlined, SmileOutlined } from '@ant-design/icons';
import { Address, IAddress } from '@/components/Address';
import { FormItemPassword } from '@/components/FormItemPassword';
import { FormItemPhone } from '@/components/FormItemPhone';
import { Link } from 'react-router-dom';
import { ContainerCenter } from '@/components/ContainerCenter';
import Captcha from '@/components/Captcha';

interface IFormValues {
    name: string;
    nickName: string;
    age: string;
    address: IAddress;
    sex: number;
    phone: string;
    password: string;
}

export function Register() {
    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields();
    };
    const onFinish = (value: IFormValues) => {
        console.log(value);
    };
    return (
        <ContainerCenter style={{ height: '100vh', marginTop: -100 }}>
            <div>
                <h3 style={{ textAlign: 'center' }}>注册</h3>
                <Form<IFormValues>
                    form={form}
                    validateTrigger={['onChange', 'onBlur']}
                    onFinish={onFinish}
                    autoComplete='off'
                >
                    <Form.Item
                        name='name'
                        rules={[
                            { required: true, message: '请输入昵称' },
                            { min: 2, max: 18, message: '请输入2-18位字符' },
                        ]}
                    >
                        <Input prefix={<MessageOutlined />} placeholder='请输入昵称'></Input>
                    </Form.Item>

                    <Form.Item
                        name='nickName'
                        rules={[
                            { required: true, message: '请输入真实姓名' },
                            { min: 2, max: 18, message: '请输入2-18位字符' },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder='请输入真实姓名'></Input>
                    </Form.Item>

                    <Form.Item
                        name='age'
                        rules={[
                            { required: true, message: '请输入年龄' },
                            { pattern: /^(?:[1-9][0-9]?|1[01][0-9]|120)$/, message: '年龄输入不合法' },
                        ]}
                    >
                        <Input prefix={<SmileOutlined />} placeholder='请输入年龄'></Input>
                    </Form.Item>

                    <Form.Item
                        name='address'
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                            //
                            {
                                validator(rule, value) {
                                    console.log(rule, value);
                                    if (value?.areas.length === 0 || value?.street === '') {
                                        return Promise.reject('填写地址完整的地址信息');
                                    }
                                    return Promise.resolve('');
                                },
                            },
                        ]}
                    >
                        <Address />
                    </Form.Item>
                    <Form.Item name='sex' rules={[{ required: true, message: '请选择性别' }]}>
                        <Radio.Group>
                            <Radio value={1}>男</Radio>
                            <Radio value={2}>女</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <FormItemPhone placeholder='请输入手机号'></FormItemPhone>
                    <FormItemPassword placeholder='请输入密码'></FormItemPassword>

                    <Captcha />
                    <Form.Item>
                        <Button style={{ width: '45%', marginRight: '10%' }} type='primary' htmlType='submit'>
                            注册
                        </Button>
                        <Button style={{ width: '45%' }} onClick={onReset}>
                            重置
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Link to={'/login'}>已有账号？去登陆</Link>
                    </Form.Item>
                </Form>
            </div>
        </ContainerCenter>
    );
}
