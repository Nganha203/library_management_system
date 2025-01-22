import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import RegisterPage from './page/register.jsx';
import UserPage from './page/userPage.jsx';
import HomePage from './page/homePage.jsx';
import LoginPage from './page/login.jsx';
import { AuthWrapper } from './component/context/auth.context.jsx';
import CreateBookPage from './page/createBook.jsx';
import ListBook from './page/listBook.jsx';
import '../src/style/global.css'
import EditBookPage from './page/editBook.jsx';
import DetailBook from './page/detailBook.jsx';
import ListDeletedBook from './page/listDeletedBook.jsx';
import ProfileUser from './page/profileUser.jsx';

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: 1,
				element: <HomePage />
			},
			{
				path: 'user',
				element: <UserPage />
			},
			{
				path: 'register',
				element: <RegisterPage />
			},
			{
				path: 'login',
				element: <LoginPage />
			},
			{
				path: 'create-book',
				element: <CreateBookPage />
			},
			{
				path: 'list-book',
				element: <ListBook />
			},
			{
				path: 'edit-book/:id',
				element: <EditBookPage />
			},
			{
				path: 'list-deleted-book',
				element: <ListDeletedBook />
			},
			{
				path: 'detail-book/:id',
				element: <DetailBook />
			},
			{
				path: 'profile',
				element: <ProfileUser />
			}
		]
	},


]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthWrapper>
			<RouterProvider router={router}></RouterProvider>
		</AuthWrapper>
	</React.StrictMode>,
)
