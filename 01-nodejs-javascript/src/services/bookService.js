const Book = require("../models/book")

module.exports = {
    createBookService: async (data) => {
        try {
            const result = await Book.create(data)
            return result
        } catch (error) {
            console.log('check error: ', error)
        }
    },
    getBookService: async () => {
        try {
            const result = await Book.find({})
            return result
        } catch (error) {
            console.log('check error: ', error)
        }

    },
    getOneBookService: async (id) => {
        try {
            const result = await Book.findById(id)
            return result
        } catch (error) {
            console.log('check error: ', error)
        }

    },
    editBookService: async (data) => {
        try {
            const result = await Book.findOneAndUpdate({ _id: data.id }, { title: data.title, category: data.category, author: data.author, image: data.image })
            return result
        } catch (error) {
            console.log('check error: ', error)
        }

    },
    deleteBookService: async (id) => {
        try {
            const result = await Book.deleteById({ _id: id })
            return result
        } catch (error) {
            console.log('check error: ', error)
        }

    },
    getListDeletedBookService: async () => {
        try {
            const result = await Book.findWithDeleted({})
            return result
        } catch (error) {
            console.log('check error: ', error)
        }

    },
    restoreBookService: async (id) => {
        try {
            const result = await Book.restore({ _id: id })
            return result
        } catch (error) {
            console.log('check error: ', error)
        }

    },
    createBorrowService: async (id, emailUser) => {
        try {
            const book = await Book.findById(id)
            if (!book) {
                return {
                    EC: 1,
                    message: "Không tìm thấy sách"
                }
            }

            if (book.isBorrowed) {
                return {
                    EC: 1,
                    message: "Sách đã được mượn"
                }
            }
            book.isBorrowed = true,
            book.borrowedBy = emailUser,
            book.borrowedAt = new Date()
            book.dueDate = new Date(+new Date() + 15 * 24 * 60 * 60 * 1000)
            await book.save()
            return {
                EC: 0,
                data: book
            }

        } catch (error) {
            console.log('check error: ', error)
        }

    },
    returnBookService: async(id, emailUser) => {
        try {
            const book = await Book.findById(id)
            if (!book) {
                return {
                    EC: 1,
                    message: "Không tìm thấy sách"
                }
            }
            if(book.borrowedBy !== emailUser && emailUser !== 'nganha@gmail.com'){
                return {
                    EC: 1,
                    message: "Bạn không phải là người mượn sách này !"
                }
            }
            book.isBorrowed = false,
            book.borrowedBy = null,
            book.borrowedAt = null,
            book.dueDate = null
            await book.save()

            return {
                EC: 0,
                data: book
            }

        } catch (error) {
            console.log('check error return: ', error)
        }

    },
    getBookBorrowService: async(emailUser) => {
        try {
            const result = await Book.find({borrowedBy: emailUser})
            return {
                EC: 0,
                data: result
            }
        } catch (error) {
            console.log('error: ', error)
        }
    },
    getRandomBookService: async () => {
        try {
            const result = await Book.aggregate([
                { $sample: { size: 5 } } 
            ]);
            return {
                EC: 0,
                data: result
            }
        } catch (error) {
            console.log('check error: ', error)
        }
    },
    getBookUserBorrowService: async (emailUser) => {
        try {
            const result = await Book.find({borrowedBy: emailUser})
            return {
                EC: 0,
                data: result
            }
        } catch (error) {
            console.log('error: ', error)
        }
    }

}