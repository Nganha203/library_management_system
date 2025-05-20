import { useContext, useEffect, useState } from "react";
import CardBook from "../component/playout/card";
import SearchPlayout from "../component/playout/search";
import SelectPlayout from "../component/playout/select";
import { Link } from "react-router-dom";
import { getListBook, getRandomBook } from "../util/api";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ScrollToStop from "../component/scrollToTop";
import { AuthContext } from "../component/context/auth.context";
import { Pagination } from "antd";
import removeAccents from 'remove-accents';

const HomePage = () => {
    const [listBook, setlistBook] = useState([])
    const [listRandom, setListRandom] = useState([])
    const [filterList, setFilterList] = useState([])
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const { auth } = useContext(AuthContext)

    useEffect(() => {
        const fetchGetBookApi = async () => {
            const res = await getListBook()
            if (!res?.message) {  // message thong bao loi               
                setlistBook(res)
            }
            else {
                notification.error({
                    message: 'Unauthorized',
                    description: res.message
                })
            }
            return res
        }
        const fetchGetRandomBookApi = async () => {
            const res = await getRandomBook()
            if (res.EC === 0) {
                setListRandom(res.data)
            }
            else {
                notification.error({
                    message: 'Unauthorized',
                    description: res.message
                })
            }
            return res
        }
        fetchGetRandomBookApi()
        fetchGetBookApi()
    }, [])

    const handleSearch = (value) => {

        if(!value.trim()){
            setFilterList([])
            return
        }

        const lowercasedValue = removeAccents(value.toLowerCase());
        const filtered = listBook.filter(
            (book) => {
                return removeAccents(book.title.toLowerCase()).includes(lowercasedValue)
            }
        );
        setFilterList(filtered);
    };
    const handleSelect = (value) => {
        const lowercasedValue = value.toLowerCase();
        const filtered = listBook.filter(
            (book) => {
                return book.category.toLowerCase().includes(lowercasedValue)
            }
        );
        setFilterList(filtered);
    };

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 1024, min: 814 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 814, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    const pageSize = 10; // Số sách trên mỗi trang

    // Tính toán sách cho trang hiện tại
    const startIndex = (currentPage - 1) * pageSize; // Vị trí bắt đầu
    const currentBooks = listBook.slice(startIndex, startIndex + pageSize); // Dữ liệu trang hiện tại

    // Hàm xử lý khi chuyển trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="home-page">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex justify-center">
                    <img style={{ width: 150, height: 120 }} src="/image/logo.png" alt="" />
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px", // Khoảng cách giữa input và select
                        marginBottom: "30px",
                        padding: "0 20px"
                    }}
                >
                    <div style={{ width: "400px" }}>
                        <SearchPlayout onSearch={handleSearch} />
                    </div>
                    <div style={{ width: "150px" }}>
                        <SelectPlayout onChange={handleSelect} />
                    </div>
                </div>

                {
                    filterList.length > 0 ?
                        <>
                            <div className="mt-[30px]">
                                <div className="grid place-items-center relative max-w-fit min-w-[100px] h-[50px] m-10">
                                    <div className=" absolute w-full h-full border-2 border-white rounded-l-md border-r-0"></div>
                                    <div className=" w-[40px] h-[40px] border-2 border-white rounded-lg rotate-45 absolute top-[5px] -right-[18px] border-b-0 border-l-0"></div>
                                    <p className="px-4 text-[18px] text-white font-medium">Result search</p>
                                </div>
                                <div className="group-card">
                                    {
                                        filterList.map((book) => {
                                            return (
                                                <Link key={book._id} to={auth?.user?.email ? `/detail-book/${book._id}` : `/login`} style={{ textDecoration: "none" }}>
                                                    <CardBook
                                                        book={book}
                                                    />
                                                </Link>
                                            )

                                        })
                                    }

                                </div>

                            </div> 
                        </>
                        :
                        <>
                            <div className="mt-[30px]">
                                <div className="grid place-items-center relative max-w-fit min-w-[100px] h-[50px] m-10">
                                    <div className=" absolute w-full h-full border-2 border-white rounded-l-md border-r-0"></div>
                                    <div className=" w-[40px] h-[40px] border-2 border-white rounded-lg rotate-45 absolute top-[5px] -right-[18px] border-b-0 border-l-0"></div>
                                    <p className="px-4 text-[18px] text-white font-medium">Top choices</p>
                                </div>


                                <div className="book-random">

                                    <Carousel
                                        swipeable={false}
                                        draggable={false}
                                        showDots={true}
                                        responsive={responsive}
                                        infinite={true}
                                        autoPlay={true}
                                        keyBoardControl={true}
                                        containerClass="carousel-container"
                                        removeArrowOnDeviceType={["tablet", "mobile"]}
                                        dotListClass="custom-dot-list-style"
                                        itemClass="carousel-item-padding-20-px"
                                    >
                                        {
                                            listRandom.map((book) => {
                                                return (
                                                    <>
                                                        <Link key={book._id} to={auth?.user?.email ? `/detail-book/${book._id}` : `/login`} style={{ textDecoration: "none" }}>
                                                            <CardBook
                                                                book={book}
                                                            />
                                                        </Link>

                                                    </>

                                                )

                                            })
                                        }
                                    </Carousel>

                                </div>
                            </div>

                            <div className="mt-[30px]">
                                <div className="grid place-items-center relative max-w-fit min-w-[100px] h-[50px] m-10">
                                    <div className=" absolute w-full h-full border-2 border-white rounded-l-md border-r-0"></div>
                                    <div className=" w-[40px] h-[40px] border-2 border-white rounded-lg rotate-45 absolute top-[5px] -right-[18px] border-b-0 border-l-0"></div>
                                    <p className="px-4 text-[18px] text-white font-medium">All book</p>
                                </div>
                                <div className="group-card">
                                    {
                                        currentBooks.map((book) => {
                                            return (
                                                <Link key={book._id} to={auth?.user?.email ? `/detail-book/${book._id}` : `/login`} style={{ textDecoration: "none" }}>
                                                    <CardBook
                                                        book={book}
                                                    />
                                                </Link>
                                            )

                                        })
                                    }

                                </div>

                            </div>

                        </>
                }
                <Pagination
                    current={currentPage} // Trang hiện tại
                    pageSize={pageSize} // Số sách trên mỗi trang
                    total={listBook.length} // Tổng số sách
                    onChange={handlePageChange} // Hàm xử lý khi đổi trang
                    style={{ display: "flex", justifyContent: "center", marginBottom: "60px" }}
                />
                <ScrollToStop />
            </div>
        </div>

    )
}

export default HomePage