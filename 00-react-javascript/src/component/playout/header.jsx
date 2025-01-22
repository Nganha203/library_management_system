import React, { useContext, useState } from 'react';
import {
    SmileOutlined,
    HomeOutlined,
    UserOutlined,
    LoginOutlined,
    PlusOutlined,
    BookOutlined,
    FileExcelOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { EMAIL_ADMIN } from '../../constant';

const Header = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    // console.log(auth);

    // Các mục bên trái
    const leftItems = [
        {
            label: <Link to={'/'}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        ...(auth.isAuthenticated && auth?.user?.email === EMAIL_ADMIN
            ? [
                {
                    label: <Link to={'/user'}>List user</Link>,
                    key: 'user',
                    icon: <UserOutlined />,
                },
                {
                    label: <Link to={'/create-book'}>Create Book</Link>,
                    key: 'create_book',
                    icon: <PlusOutlined />,
                },
                {
                    label: <Link to={'/list-book'}>List Book</Link>,
                    key: 'list_book',
                    icon: <BookOutlined />,
                },
                {
                    label: <Link to={'/list-deleted-book'}>List Deleted Book</Link>,
                    key: 'list_deleted',
                    icon: <FileExcelOutlined />,
                },
            ]
            : []),
    ];

    // Các mục bên phải
    const rightItems = [
        {
            label: auth?.user?.email ? `Welcome ${auth?.user?.email}` : 'Your account',
            key: 'SubMenu',
            icon: <LoginOutlined />,
            children: [
                ...(auth.isAuthenticated && auth?.user?.email
                    ? [
                        {
                            label: (
                                <span
                                    onClick={() => {
                                        localStorage.clear('access_token');
                                        setCurrent('home');
                                        navigate('/');
                                        setAuth({
                                            isAuthenticated: false,
                                            user: {
                                                email: '',
                                                name: '',
                                            },
                                        });
                                    }}
                                >
                                    Đăng xuất
                                </span>
                            ),
                            key: 'log_out',
                        },
                        {
                            label: (
                                <Link to={auth?.user?.email ? '/profile' : '/login'}>
                                    {auth?.user?.email ? `${auth?.user?.name}` : 'Your account'}
                                </Link>
                            ),
                            key: 'profile',
                            icon: <SmileOutlined />,
                        },

                    ]
                    : [
                        {
                            label: <Link to={'/login'}>Đăng nhập</Link>,
                            key: 'sign_up',
                        },
                        {
                            label: <Link to={'/register'}>Đăng ký</Link>,
                            key: 'sign_in',
                        },
                    ]),
            ],
        },

    ];

    const [current, setCurrent] = useState('home');
    const [currentUser, setCurrentUser] = useState('SubMenu');
    const onClickBook = (e) => {
        setCurrent(e.key);
    };
    const onClickLogin = (e) => {
        setCurrentUser(e.key)
    }

    return (
        // <Menu
        //     onClick={onClick}
        //     selectedKeys={[current]}
        //     mode="horizontal"
        //     items={allItems}           
        // />
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 16px',
                background: '#fff',
            }}
        >
            {/* Phần bên trái */}
            <Menu
                onClick={onClickBook}
                selectedKeys={[current]}
                mode="horizontal"
                items={leftItems}
                style={{ flex: 1 }}
            />

            {/* Phần bên phải */}
            <Menu
                onClick={onClickLogin}
                selectedKeys={[currentUser]}
                mode="horizontal"
                items={rightItems}
                style={{ display: 'flex', gap: '10px' }}
            />
        </div>
    );
};

export default Header;
