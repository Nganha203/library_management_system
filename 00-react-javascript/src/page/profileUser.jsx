import { Button, notification, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { getListBookBorrow, returnBookApi } from "../util/api";
import SearchPlayout from "../component/playout/search";
import SelectPlayout from "../component/playout/select";

const ProfileUser = () => {
    const [dataSource, setDataSourse] = useState([])
    const [filterList, setFilterList] = useState([])

    useEffect(() => {
        const fetchGetBookApi = async () => {
            const res = await getListBookBorrow()
            if (!res?.message) {           
                setDataSourse(res.data)
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
    const handleReturnBook = async (id) => {
        const res = await returnBookApi(id)
        if (res && res.EC === 0) {
            notification.success({
                message: "RETURN BOOK",
                description: "success"
            })
            const updatedData = await getListBookBorrow(); // Gọi lại API để lấy dữ liệu mới
            setDataSourse(updatedData.data); // Cập nhật state với dữ liệu từ server
        }
        else {
            notification.error({
                message: res.message,
                description: "error"
            })
        }
    }

    const dataRender = filterList.length > 0 ? filterList : dataSource

    const columns = [
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
            align: "center"
        },
        {
            title: 'Category',
            dataIndex: 'category',
            align: "center",
            responsive: ['md']
        },
        {
            title: 'Author',
            dataIndex: 'author',
            align: "center",
            responsive: ['md']
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
            responsive: ['md']
        },
        {
            title: 'Action',
            key: 'action',
            align: "center",
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => handleReturnBook(record._id)} style={{ backgroundColor: "#5D3FD3" }} type="primary">Return</Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '30px 40px' }}>
            <div style={{ textAlign: "center" }}>
                <i style={{color: "white", fontSize: 90 }} className="fa-regular fa-circle-user"></i>
            </div>
            <h1 style={{ textAlign: "center", margin: "20px 0" }}>Welcome your list book</h1>
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
            <Table
                bordered
                dataSource={dataRender}
                columns={columns}
                rowKey={'_id'}
            />
        </div>
    )
}

export default ProfileUser