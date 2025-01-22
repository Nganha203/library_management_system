import React from 'react';
import { Button, Form, Input, notification, Row, Col } from 'antd';
import { createUserApi } from '../util/api';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate()

    const onFinish = async (values) => {
        const { email, password, name } = values
        const res = await createUserApi(email, password, name)
        if (res) {
            notification.success({
                message: "CREATE USER",
                description: "success"
            })
            navigate('/login')
        }
        else {
            notification.error({
                message: "HAVE ERROR",
                description: "error"
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
                            Register
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

                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <div style={{ display: "flex", justifyContent: "space-between", color: "#1668dc", cursor: "pointer" }}>
                                <Form.Item label={null}>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                                <Link to={'/login'}>You have account? Login</Link>
                            </div>

                        </Form>
                    </fieldset>

                </Col>
            </Row>


        </div>

    )

};
export default RegisterPage;