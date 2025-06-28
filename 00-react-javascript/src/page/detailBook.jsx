import React, { useEffect, useState } from 'react';
import { Button, Tag, notification } from 'antd';
import { useParams } from 'react-router-dom';
import { getOneBook, borrowerBookApi, returnBookApi } from '../util/api';
import ScrollToStop from '../component/scrollToTop';

const DetailBook = () => {
    const { id } = useParams();
    const [data, setData] = useState({})

    useEffect(() => {
        window.scrollTo(0, 0); // Cuộn lên đầu trang
    }, []);

    useEffect(() => {
        const fetchGetOneBookApi = async () => {
            try {
                const res = await getOneBook(id)
                if (res) {
                    setData(res)
                }
                else {
                    console.log('no data')
                }
                return res
            } catch (error) {
                console.log('error :', error)
            }

        }
        fetchGetOneBookApi()
    }, [id])

    const handleBorrower = async (id) => {
        const res = await borrowerBookApi({ id })
        if (res && res.EC === 0) {
            notification.success({
                message: "BORROW BOOK",
                description: "success"
            })
            const updatedData = await getOneBook(id); // Gọi lại API để lấy dữ liệu mới
            setData(updatedData); // Cập nhật state với dữ liệu từ server
        }
        else {
            notification.error({
                message: res.message,
                description: "error"
            })
        }
    }

    const handleReturnBook = async (id) => {
        const res = await returnBookApi(id)
        if (res && res.EC === 0) {
            notification.success({
                message: "RETURN BOOK",
                description: "success"
            })
            const updatedData = await getOneBook(id); 
            setData(updatedData); 
        }
        else {
            notification.error({
                message: res.message,
                description: "error"
            })
        }
    }
    return (
        <div style={{ padding: '30px' }}>
            <div className='detail-layout'>
                <div className='detail-slider'>
                    {data &&
                        <div className='cover-img'>
                            <img src={data?.image || 'N/A'} />
                        </div>
                    }
                    <div className='btn-borrow'>
                        {
                            data?.isBorrowed
                                ? <Button onClick={() => handleReturnBook(id)} style={{ backgroundColor: "#5D3FD3" }} type='primary'>Return</Button>
                                : <Button onClick={() => handleBorrower(id)} style={{ backgroundColor: "#4CBB17" }} type='primary' >Borrow</Button>
                        }

                    </div>
                </div>
                <div className='px-5'>
                    <div className='detail-description'>
                        {data &&
                            <div>
                                <h3 style={{ marginBottom: 10 }}>Name book: <span className='font-medium'>{data?.title || 'N/A'}</span> </h3>
                                <h3 style={{ marginBottom: 10 }}>Author book: <span className='font-medium'>{data?.author || 'N/A'}</span> </h3>
                                <h3 style={{ marginBottom: 10 }}>Category book: <span className='font-medium'>{data?.category || 'N/A'}</span> </h3>
                                <h3 style={{ marginBottom: 10 }}>Status book:
                                    <span style={{ marginLeft: 10 }}>
                                        {
                                            data?.isBorrowed ? <Tag color="red">borrowed</Tag> : <Tag color="green">available</Tag>
                                        }
                                    </span>
                                </h3>
                                <h3 style={{ marginBottom: 10 }}>
                                    Borrowed day:
                                    {
                                        data?.isBorrowed ?
                                            <span style={{ marginLeft: 10, fontWeight: 400 }}>
                                                {new Date(data.borrowedAt).toLocaleDateString('vi-VN')}
                                            </span>
                                            : ''
                                    }

                                </h3>
                                <h3 style={{ marginBottom: 10 }}>
                                    Payment day:
                                    {
                                        data?.isBorrowed ?
                                            <span style={{ marginLeft: 10, fontWeight: 400 }}>
                                                {new Date(data.dueDate).toLocaleDateString('vi-VN')}
                                            </span>
                                            : ''
                                    }
                                </h3>
                                <h3 style={{ marginBottom: 10 }}>Content summary: </h3>
                                <p style={{ lineHeight: 1.5 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quia vel optio assumenda adipisci, earum consectetur omnis nam nobis molestiae sunt eveniet sequi sapiente. Mollitia ut illo soluta dolorem, placeat non cupiditate similique modi corrupti et at est. Quod sunt eum ipsam odit nihil minima maxime dolore dolorem, sint dolorum facere tempore suscipit numquam excepturi. Inventore incidunt delectus nobis fugiat ducimus eius error commodi reiciendis quod numquam. Autem facere dolore modi, omnis veritatis sint harum distinctio dolorem dolor beatae odit ratione eaque ad totam eos mollitia exercitationem neque inventore ullam officia veniam expedita? Deleniti necessitatibus dignissimos qui libero amet, repellat odit praesentium hic reprehenderit deserunt laborum dicta, temporibus eius reiciendis, enim earum ratione. Ullam mollitia possimus ab voluptate? Molestiae necessitatibus laborum dolorem autem nam distinctio nihil inventore, ad velit maxime id nesciunt ab, ea ipsum eligendi adipisci, fugit laboriosam aperiam! Asperiores odio minus praesentium! Autem, sit in? Tenetur tempore, qui suscipit placeat saepe ratione! Dolorum libero aspernatur vel, sequi sit alias magni repellendus provident maxime consequuntur totam incidunt deleniti ad rerum, eius accusamus laudantium. Culpa, quia blanditiis sit mollitia at natus quasi assumenda unde saepe sed officiis iste cum, adipisci temporibus reiciendis ea vero sapiente soluta ipsum tempore doloremque!</p>
                            </div>
                        }

                    </div>
                </div>

            </div>

            {/* CHAPTER */}
            <div className="my-5">
                <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2 p-4">
                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                <path d="M22 4L12 14.01l-3-3" />
                            </svg>
                            <p className='font-medium'>
                                Chapter 1:
                                <span className="font-normal ml-1">Lorem, ipsum dolor sit amet consectetur adipisicing .</span>
                            </p>
                            
                        </div>
                    </div>
                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                <path d="M22 4L12 14.01l-3-3" />
                            </svg>
                            <p className='font-medium'>
                                Chapter 2:
                                <span className="font-normal ml-1">Lorem, ipsum dolor sit amet consectetur adipisicing .</span>
                            </p>
                        </div>
                    </div>
                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                <path d="M22 4L12 14.01l-3-3" />
                            </svg>
                            <p className='font-medium'>
                                Chapter 3:
                                <span className="font-normal ml-1">Lorem, ipsum dolor sit amet consectetur adipisicing .</span>
                            </p>
                        </div>
                    </div>
                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                <path d="M22 4L12 14.01l-3-3" />
                            </svg>
                            <p className='font-medium'>
                                Chapter 4:
                                <span className="font-normal ml-1">Lorem, ipsum dolor sit amet consectetur adipisicing .</span>
                            </p>
                        </div>
                    </div>
                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                <path d="M22 4L12 14.01l-3-3" />
                            </svg>
                            <p className='font-medium'>
                                Chapter 5:
                                <span className="font-normal ml-1">Lorem, ipsum dolor sit amet consectetur adipisicing .</span>
                            </p>
                        </div>
                    </div>
                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                <path d="M22 4L12 14.01l-3-3" />
                            </svg>
                            <p className='font-medium'>
                                Chapter 6:
                                <span className="font-normal ml-1">Lorem, ipsum dolor sit amet consectetur adipisicing .</span>
                            </p>
                        </div>
                    </div>
                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                <path d="M22 4L12 14.01l-3-3" />
                            </svg>
                            <p className='font-medium'>
                                Chapter 7:
                                <span className="font-normal ml-1">Lorem, ipsum dolor sit amet consectetur adipisicing .</span>
                            </p>
                        </div>
                    </div>
                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                <path d="M22 4L12 14.01l-3-3" />
                            </svg>
                            <p className='font-medium'>
                                Chapter 8:
                                <span className="font-normal ml-1">Lorem, ipsum dolor sit amet consectetur adipisicing .</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <ScrollToStop/>
        </div>
    )


};

export default DetailBook;
