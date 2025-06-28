import { Button, notification, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { deleteBookApi, getListBook } from "../util/api";
import SearchPlayout from "../component/playout/search";
import SelectPlayout from "../component/playout/select";
import { Link } from "react-router-dom";
import ScrollToStop from "../component/scrollToTop";
import ModalLayout from "../component/playout/modal";

const ListBook = () => {
    const [dataSource, setDataSourse] = useState([])
    const [filterList, setFilterList] = useState([])

    useEffect(() => {
        const fetchGetBookApi = async () => {
            const res = await getListBook()
            if (!res?.message) {            
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
        fetchGetBookApi()
    }, [])

    const handleSearch = (value) => {
        const lowercasedValue = value.toLowerCase();
        const filtered = dataSource.filter(
            (book) => {
                return book.title.toLowerCase().includes(lowercasedValue)
            }
        );
        setFilterList(filtered);
    };

    const handleSelect = (value) => {
        const lowercasedValue = value.toLowerCase();
        const filtered = dataSource.filter(
            (book) => {
                return book.category.toLowerCase().includes(lowercasedValue)
            }
        );
        setFilterList(filtered);
    };

    const handleDeleteBook = async (id) => {
        const res = await deleteBookApi(id)
        if (res) {
            notification.success({
                message: "DELETE BOOK",
                description: "success"
            })
            const update = await getListBook()
            setDataSourse(update)
        }
        else {
            notification.error({
                message: "HAVE ERROR",
                description: "error"
            })
        }
    }

    const dataRender = filterList.length > 0 ? filterList : dataSource

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            align: "center",
            responsive: ['lg'],
            
        },
        {
            title: 'Title',
            dataIndex: 'title',
            align: "center"
        },
        {
            title: 'Category',
            dataIndex: 'category',
            align: "center",
            responsive: ['md'],
        },
        {
            title: 'Author',
            dataIndex: 'author',
            align: "center",
            responsive: ['md'],
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
            responsive: ['md'],
        },
        {
            title: 'Status',
            dataIndex: 'isBorrowed',
            align: "center",
            render: (_, record) => (
                record.isBorrowed ? <Tag color="red">borrowed</Tag> : <Tag color="green">available</Tag>
            ),
            responsive: ['md'],
        },
        {
            title: 'Action',
            key: 'action',
            align: "center",
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/edit-book/${record._id}`}>
                        <Button type="primary"><EditOutlined /></Button>
                    </Link>

                    <ModalLayout
                        title='Delete'
                        color={'red'}
                        handleClick={() => handleDeleteBook((record._id))}
                        feature={<DeleteOutlined />}
                        content='Are you sure delete this book ?'
                    />
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: 30 }}>
            <div className="flex justify-center">
                <h1 className="text-3xl font-bold text-center py-2.5 px-3 bg-white mb-5 max-w-60 rounded-lg text-blue-500">List Book</h1>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px", 
                    marginBottom: "30px",
                }}
            >
                <div style={{ width: "400px" }}>
                    <SearchPlayout onSearch={handleSearch} />
                </div>
                <div style={{ width: "150px" }}>
                    <SelectPlayout onChange={handleSelect} />
                </div>
            </div>

            <div className="mb-10">
                <Table
                    bordered
                    dataSource={dataRender}
                    columns={columns}
                    rowKey={'_id'}
                />
            </div>


            <ScrollToStop />
        </div>
    )
}

export default ListBook