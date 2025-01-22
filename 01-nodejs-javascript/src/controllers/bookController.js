const {getBookUserBorrowService, getRandomBookService, getBookBorrowService, returnBookService, createBorrowService, restoreBookService, getListDeletedBookService, createBookService, getBookService, editBookService, getOneBookService, deleteBookService } = require("../services/bookService")

module.exports = {
    createBookController: async (req, res) => {
        const data = req.body
        const result = await createBookService(data)
        res.status(200).json(result)
    },
    getBookController: async (req, res) => {
        const result = await getBookService()
        res.status(200).json(result)
    },
    getOneBookController: async (req, res) => {
        const id = req.params.id
        const result = await getOneBookService(id)
        res.status(200).json(result)
    },
    editBookController: async (req, res) => {
        // const {id, title, category, author} = req.body
        const data = req.body
        const result = await editBookService(data)
        res.status(200).json(result)
    },
    deleteBookController: async (req, res) => {
        const id = req.params.id
        const result = await deleteBookService(id)
        res.status(200).json(result)
    },
    getListDeleteBookController: async (req, res) => {
        const result = await getListDeletedBookService()
        res.status(200).json(result)
    },
    restoreBookController: async (req, res) => {
        const id = req.params.id
        const result = await restoreBookService(id)
        res.status(200).json(result)
    },
    createBorrowersController: async (req, res) => {
        const id = req.body.id
        const emailBorrow = req.user.email
        const result = await createBorrowService(id, emailBorrow)
        res.status(200).json(result)
    },
    returnBookController: async (req, res) => {
        const id = req.params.id
        const emailUser = req.user.email
        const result = await returnBookService(id, emailUser)
        res.status(200).json(result)
    },
    getBookBorrowController: async (req, res) => {
        const emailUser = req.user.email
        const result = await getBookBorrowService(emailUser)
        res.status(200).json(result)
    },
    getRandomBookController: async (req, res) => {
        const result = await getRandomBookService()
        res.status(200).json(result)
    },
    getBookUserBorrowController: async (req, res) => {
        const emailUser = req.query.email
        const result = await getBookUserBorrowService(emailUser)
        res.status(200).json(result)
    }
}