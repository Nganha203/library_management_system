import { useContext, useState } from 'react';
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

    const allItems = [
        // Mục bên trái
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
        // Mục bên phải
        {
            label: auth?.user?.email ? `Welcome ${auth?.user?.email}` : 'Your account',
            key: 'SubMenu',
            icon: <LoginOutlined />,
            style: { marginLeft: 'auto' }, // Căn phải
            children: [
                ...(auth.isAuthenticated && auth?.user?.email
                    ? [
                        {
                            label: (
                                <span
                                    style={{color: "red"}}
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
    const onClickMenu = (e) => {
        setCurrent(e.key);
    };

    return (
        <div style={{position: "fixed", width: "100%", zIndex: 1}}>
            <Menu
                onClick={onClickMenu}
                selectedKeys={[current]}
                mode="horizontal"
                items={allItems}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px',
                    background: 'rgb(226, 236, 251)',

                }}
            />
        </div>


    );
};

export default Header;
