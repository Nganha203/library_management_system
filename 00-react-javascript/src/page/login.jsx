import React, { useContext } from 'react';
import { Button, Form, Input, notification, Row, Col } from 'antd';
import { loginUserApi } from '../util/api';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../component/context/auth.context';

const LoginPage = () => {
    const navigate = useNavigate()
    const { setAuth } = useContext(AuthContext)

    const onFinish = async (values) => {
        const { email, password } = values
        const res = await loginUserApi(email, password)
        
        if (res && res.EC === 0) {
            localStorage.setItem('access_token', res.access_token)
            notification.success({
                message: "LOGIN SUCCESS",
                description: "success"
            })
            setAuth({
                isAuthenticated: true,
                user: {
                    email: res?.user?.email ?? "",
                    name: res?.user?.name ?? ""
                }
            })
            navigate('/')
        }
        else {
            notification.error({
                message: "PASSWORD OR EMAIL INVALID",
                description: res?.EM ?? "error"
            })
        }
    };
    return (
        <div style={{ padding: 30 }}>
            <Row justify={'center'}>
                <Col xs={24} md={16} lg={8}>
                    <fieldset style={{
                        padding: "15px",
                        margin: "5px",
                        border: "1px solid black",
                        borderRadius: "5px",
                        backgroundColor: "white"
                    }}>
                        <legend style={{
                            padding: "5px 10px",
                            backgroundColor: "#273239",
                            color: "white",
                            fontSize: "18px",
                            borderRadius: "5px"
                        }}>
                            Login
                        </legend>
                        <Form
                            name="basic"
                            onFinish={onFinish}
                            autoComplete="off"
                            layout='vertical'
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <div style={{ display: "flex", justifyContent: "space-between", color: "#1668dc", cursor: "pointer" }}>
                                <Form.Item label={null}>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                                <Link to={'/register'}>You don't have account? Register</Link>
                            </div>
                        </Form>
                    </fieldset>
                </Col>
            </Row>
        </div>
    )

};
export default LoginPage