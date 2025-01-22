const { createUserService, handleLoginServer, getUserService } = require("../services/userService")

module.exports = {
    createUserController: async (req, res) => {
        const {name, password, email} = req.body
        const result = await createUserService(name, password, email)
        return res.status(200).json(result)
    },
    handleLoginController: async (req, res) => {
        const {email, password} = req.body
        const result = await handleLoginServer(email, password)
        return res.status(200).json(result)
    },
    getUserController: async (req, res) => {
        const result = await getUserService()
        res.status(200).json(result)
    },
    getAccountController: (req, res) => {
        res.status(200).json(req.user)
    }
}