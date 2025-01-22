import { Button, notification, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { getBookUserBorrow, getUserApi, returnBookApi } from "../util/api";
import ScrollToStop from "../component/scrollToTop";
import { CheckOutlined } from "@ant-design/icons";
import ModalLayout from "../component/playout/modal";

const UserPage = () => {
    const [dataSource, setDataSourse] = useState([])
    const [listBook, setListBook] = useState([])
    const [show, setShow] = useState(false)
    const [nameUser, setNameUser] = useState(null)

    useEffect(() => {
        const fetchGetUserApi = async () => {
            const res = await getUserApi()
            if (!res?.message) {  // message thong bao loi
                setDataSourse(res)
            }
            else {
                notification.error({
                    message: 'Unauthorized',
                    description: res.message
                })
            }
            return res
        }
        fetchGetUserApi()
    }, [])

    const showBookUserBorrow = async (email, name) => {
        const res = await getBookUserBorrow(email)
        if (res && res.EC === 0) {
            setListBook(res.data)
            setShow(true)
            setNameUser(name)
        }
        else {
            setShow(false)
        }
    }

    const handleReturnBook = async (id) => {
        const res = await returnBookApi(id)
        if (res && res.EC === 0) {
            notification.success({
                message: "RETURN BOOK",
                description: "success"
            })
            const updateTable = listBook.filter((book) => book._id !== id)
            setListBook(updateTable)
        }
        else {
            notification.error({
                message: res.message,
                description: "error"
            })
        }
    }

    const columnsUser = [
        {
            title: 'ID',
            dataIndex: '_id',
            align: "center",
            responsive: ['lg']
        },
        {
            title: 'Name',
            dataIndex: 'name',
            align: "center",
            responsive: ['md']
        },
        {
            title: 'Email',
            dataIndex: 'email',
            align: "center"
        },
        {
            title: "Role",
            dataIndex: "role",
            align: "center",
            render: (_, record) => (
                <span>{record.email === 'nganha@gmail.com' ? 'ADMIN' : 'USER'}</span>
            )
        },
        {
            title: "Action",
            key: "action",
            align: "center",
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => showBookUserBorrow(record.email, record.name)} className="text-white hover:bg-white bg-green-500" type="default"><CheckOutlined /></Button>
                </Space>

            )
        }
    ];
    const columnBorrow = [
        {
            title: 'STT',
            dataIndex: 'index',
            render: (_, __, index) => index + 1,
            align: "center",
            responsive: ['md']
        },
        {
            title: 'Title',
            dataIndex: 'title',
            align: "center",
            
        },
        {
            title: 'Category',
            dataIndex: 'category',
            align: "center",
            responsive: ['lg']
        },
        {
            title: 'Author',
            dataIndex: 'author',
            align: "center",
            responsive: ['lg']
        },
        {
            title: 'Borrowed day',
            render: (_, record) => (
                <span>{new Date(record.borrowedAt).toLocaleDateString('vi-VN')}</span>
            ),
            align: "center",
            responsive: ['md']
        },
        {
            title: 'Payment day',
            align: "center",
            render: (_, record) => (
                <span>{new Date(record.dueDate).toLocaleDateString('vi-VN')}</span>
            ),
        },
        {
            title: 'Image',
            key: 'image',
            align: "center",
            render: (_, record) => (
                <Space size="middle">
                    <img style={{
                        width: "50px",
                        height: "70px",
                        objectFit: "cover"
                    }}
                        src={record.image} />
                </Space>
            ),
            responsive: ['lg']
        },
        {
            title: 'Action',
            key: 'action',
            align: "center",
            render: (_, record) => (
                <Space size="middle">
                    {/* <Button onClick={() => handleReturnBook(record._id)} style={{ backgroundColor: "#5D3FD3" }} type="primary">Return</Button> */}
                    <ModalLayout
                        title='Return'
                        color={'#5D3FD3'}
                        handleClick={() => handleReturnBook((record._id))}
                        feature={'Return'}
                        content='Are you sure return this book ?'
                    />

                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: 30 }}>
            <div className="flex justify-center">
                <h1 className="text-3xl font-bold text-center py-2.5 px-3 bg-white mb-5 max-w-60 rounded-lg text-blue-500">List users</h1>
            </div>

            <Table
                bordered
                dataSource={dataSource}
                columns={columnsUser}
                rowKey={'_id'}
            />
            {
                show ?
                    <div className="mb-10">
                        <div className="flex justify-center">
                            <h1 className="text-3xl font-bold text-center py-2.5 px-3 bg-white mb-5 max-w-60 rounded-lg text-blue-500">List book of {nameUser}</h1>
                        </div>
                        <Table
                            bordered
                            dataSource={listBook}
                            columns={columnBorrow}
                            rowKey={'_id'}
                        />
                    </div>
                    : ''

            }

            <ScrollToStop />
        </div>
    )
}

export default UserPage