require('dotenv').config()
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const saltRounds = 10;

const createUserService = async (name, password, email) => {
    const hashPassword = await bcrypt.hash(password, saltRounds)
    try {
        let result = await User.create({
            name,
            password: hashPassword,
            email,
            role: 'NGANHA'
        })
        return result;

    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}
const handleLoginServer = async (emailUser, passwordUser) => {
    try {
        const haveUser = await User.findOne({ email: emailUser })
        if (haveUser) {
            const havePass = await bcrypt.compare(passwordUser, haveUser.password)
            if (!havePass) {
                return {
                    EC: 2,
                    ME: "Password invalid"
                }
            }
            else {
                // create access token
                const payload = {
                    name: haveUser.name,
                    email: haveUser.email
                }
                const access_token = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRE
                    }
                )
                return {
                    EC: 0,
                    access_token,
                    user: {
                        name: haveUser.name,
                        email: haveUser.email
                    }
                }
            }
        }
        else {
            return {
                EC: 1,
                ME: "Password or email invalid"
            }
        }
    } catch (error) {
        console.log('>>> error handleLoginServer: ', error)
        return null
    }
}
const getUserService = async () => {
    try {
        const result = await User.find({}).select('-password')
        return result
    } catch (error) {
        console.log('error: ', error)
        return null
    }

}



module.exports = {
    createUserService,
    handleLoginServer,
    getUserService
}