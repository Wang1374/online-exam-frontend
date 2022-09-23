import { Form, Input } from 'antd';

interface IProps{
    label?: string
    placeholder?: string
}

export const FormItemPassword: React.FC<IProps> = ({label, placeholder}) =>{
    return (
        <Form.Item
            label= {label}
            name='password'
            validateTrigger={['onChange', 'onBlur']}
            rules={[
                { required: true, message: '请输入密码' },
                {
                    pattern:
                        /^(?![a-zA-Z]+$)(?![0-9]+$)(?![._~!@#$^&*]+$)(?![0-9a-zA-Z]+$)(?![0-9._~!@#$^&*]+$)(?![a-zA-Z._~!@#$^&*]+$)[A-Za-z0-9._~!@#$^&*]{6,20}$/,
                    message: '密码必须由字母、数字、特殊符号组成6-20位字符，区分大小写',
                },
            ]}
        >
            <Input.Password placeholder={placeholder}/>
        </Form.Item>
    );
}
