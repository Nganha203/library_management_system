import axios from "./axios.customize"

const createUserApi = (email, password, name) => {
    const URL_API = '/v1/api/register'
    const data = {
        email, 
        password, 
        name
    }
    return axios.post(URL_API, data)
}
const loginUserApi = (email, password) => {
    const URL_API = '/v1/api/login'
    const data = {
        email,
        password
    }
    return axios.post(URL_API, data)
}
const getUserApi = () => {
    const URL_API = '/v1/api/user'
    return axios.get(URL_API)
}
const getAccount = () => {
    const URL_API = '/v1/api/account'
    return axios.get(URL_API)
}

// BOOK
const createBookApi = (data) => {
    const URL = '/v1/api/create-book'
    return axios.post(URL, data)
}
const getListBook = () => {
    const URL = '/v1/api/list-book'
    return axios.get(URL)
}
const getOneBook = (id) => {
    const URL = `/v1/api/one-book/${id}`
    return axios.get(URL, id)
}
const editBookApi = (data) => {
    const URL = '/v1/api/edit-book'
    return axios.put(URL, data)
}
const deleteBookApi = (id) => {
    const URL = `/v1/api/delete-book/${id}`
    return axios.delete(URL, id)
}
const getDeletedBook = () => {
    const URL = `/v1/api/deleted-book`
    return axios.get(URL)
}
const restoreBookApi = (id) => {
    const URL = `/v1/api/restore-book/${id}`
    return axios.put(URL)
}
const borrowerBookApi = (data) => {
    const URL = `/v1/api/create-borrow`
    return axios.post(URL, data)
}
const returnBookApi = (id) => {
    const URL = `/v1/api/return-book/${id}`
    return axios.put(URL, id)  
}
const getListBookBorrow = () => {
    const URL = `/v1/api/list-borrow`
    return axios.get(URL)
}
const getRandomBook = () => {
    const URL = `/v1/api/randomBook`
    return axios.get(URL)
}
const getBookUserBorrow = (email) => {
    const URL = `/v1/api/book-userBorrow?email=${email}`
    return axios.get(URL, email)
}

export {
    createUserApi,
    loginUserApi,
    getUserApi,
    getAccount,
    createBookApi,
    getListBook,
    getOneBook,
    editBookApi,
    deleteBookApi,
    getDeletedBook,
    restoreBookApi,
    borrowerBookApi,
    returnBookApi,
    getListBookBorrow,
    getRandomBook,
    getBookUserBorrow
}