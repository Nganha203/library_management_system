const express = require('express');
const { createUserController, handleLoginController, getUserController, getAccountController } = require('../controllers/userController');
const auth = require('../middleware/auth')
const routerAPI = express.Router();

routerAPI.all('*', auth)

routerAPI.get('/', (req, res) => {
    res.status(200).json("Hello world with API")
})
routerAPI.post('/register', createUserController)
routerAPI.post('/login', handleLoginController)
routerAPI.get('/user', getUserController)
routerAPI.get('/account', getAccountController)

const {
    getRandomBookController,
    getBookBorrowController,
    returnBookController,
    createBorrowersController,
    restoreBookController,
    getListDeleteBookController,
    createBookController,
    getBookController,
    editBookController,
    getOneBookController,
    deleteBookController,
    getBookUserBorrowController
} = require('../controllers/bookController')
routerAPI.post('/create-book', createBookController)
routerAPI.get('/list-book', getBookController)
routerAPI.get('/one-book/:id', getOneBookController)
routerAPI.put('/edit-book', editBookController)
routerAPI.delete('/delete-book/:id', deleteBookController)
routerAPI.get('/deleted-book', getListDeleteBookController)
routerAPI.put('/restore-book/:id', restoreBookController)
routerAPI.post('/create-borrow', createBorrowersController)
routerAPI.put('/return-book/:id', returnBookController)
routerAPI.get('/list-borrow', getBookBorrowController)
routerAPI.get('/randomBook', getRandomBookController)
routerAPI.get('/book-userBorrow', getBookUserBorrowController)

module.exports = routerAPI; //export default