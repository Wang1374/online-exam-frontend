import { REGEXP_PHONE } from '@/utils/patterns';
import { Form, Input } from 'antd';

interface IProps{
    label?: string
    placeholder?: string
}

export const FormItemPhone:  React.FC<IProps> = ({label, placeholder}) =>{
    return (
        <Form.Item
            label= {label}
            name='phone'
            validateTrigger={['onChange', 'onBlur']}
            rules={[
                { required: true, message: '请输入手机号' },
                { pattern: REGEXP_PHONE, message: '手机号格式错误' },
            ]}
        >
            <Input placeholder={placeholder}/>
        </Form.Item>
    );
};
