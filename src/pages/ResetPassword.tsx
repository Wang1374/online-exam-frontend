import { Form, Input } from "antd"


export const ResetPassword : React.FC = () => {
    return ( 
        <div>
           <Form>
                <Form.Item
                name="phone"
                >
                   <Input placeholder=""/>
                </Form.Item>
                <Form.Item
                name="password"
                >
                    
                </Form.Item>
           </Form>
        </div>
    )
}
