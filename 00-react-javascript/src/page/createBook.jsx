import React from 'react';
import { Button, Form, Input, notification, Row, Col } from 'antd';
import { createBookApi } from '../util/api';
import { Link, useNavigate } from 'react-router-dom';

const CreateBookPage = () => {
    const navigate = useNavigate()

    const onFinish = async (values) => {
        const { title, category, author, image } = values
        const res = await createBookApi({ title, category, author, image })
        if (res) {
            notification.success({
                message: "CREATE BOOK",
                description: "success"
            })
            navigate('/list-book')
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
                            Create book
                        </legend>
                        <Form
                            name="basic"
                            onFinish={onFinish}
                            autoComplete="off"
                            layout='vertical'
                        >
                            <Form.Item
                                label="Title"
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input book name!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Category"
                                name="category"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input book category!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Author"
                                name="author"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input book author!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Image"
                                name="image"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input book image!',
                                    },
                                ]}
                            >
                                <Input placeholder='Link image book'/>
                            </Form.Item>

                            <div style={{marginTop: "30px", display: "flex", justifyContent: "space-between", color: "#1668dc", cursor: "pointer" }}>
                                <Form.Item label={null}>
                                    <Button type="primary" htmlType="submit">
                                        Add new book
                                    </Button>
                                </Form.Item>
                                <Link to={'/list-book'}>
                                    <Button type="dashed">Cancel</Button>
                                </Link>
                            </div>

                        </Form>
                    </fieldset>

                </Col>
            </Row>


        </div>

    )

};
export default CreateBookPage;