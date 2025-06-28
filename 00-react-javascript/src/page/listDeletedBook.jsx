import { Button, notification, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { getDeletedBook, restoreBookApi } from "../util/api";
import SearchPlayout from "../component/playout/search";
import SelectPlayout from "../component/playout/select";
import ScrollToStop from "../component/scrollToTop";
import ModalLayout from "../component/playout/modal";

const ListDeletedBook = () => {
    const [dataSource, setDataSourse] = useState([])
    const [filterList, setFilterList] = useState([])

    useEffect(() => {
        const fetchGetBookApi = async () => {
            const res = await getDeletedBook()
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

    const handleRestoreBook = async (id) => {
        const res = await restoreBookApi(id)
        if (res) {
            notification.success({
                message: "RESTORE BOOK",
                description: "success"
            })
            const updateTable = await getDeletedBook()
            setDataSourse(updateTable)
        }
        else {
            notification.error({
                message: "HAVE ERROR",
                description: "error"
            })
        }
    }

    const dataRender = filterList.length > 0 ? filterList : dataSource

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

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
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
        },
        {
            title: 'Action',
            key: 'action',
            align: "center",
            render: (_, record) => (

                record.deleted ?
                    <ModalLayout
                        title='Restore'
                        color={'#228B22'}
                        handleClick={() => handleRestoreBook((record._id))}
                        feature={'Restore'}
                        content="Are you sure restore this book ?"
                    /> : 
                    <Button type="primary" disabled>Restored</Button>


            ),
        },
    ];

    return (
        <div style={{ padding: 30 }}>
            <div className="flex justify-center">
                <h1 className="text-3xl font-bold text-center py-2.5 px-3 bg-white mb-5 max-w-60 rounded-lg text-red-600">List book deleted</h1>
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

export default ListDeletedBook