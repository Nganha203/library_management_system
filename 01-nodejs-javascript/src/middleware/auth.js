const jwt = require('jsonwebtoken');
require('dotenv').config()

const auth = (req, res, next) => {

    const list = [ '/', '/register', '/login', '/list-book', '/borrow', '/randomBook']
    if (list.find((item) => '/v1/api' + item === req.originalUrl)) {
        next()
    }
    else {
        if (req.headers.authorization && req.headers.authorization.split(" ")[1]) {
            const token = req.headers.authorization.split(" ")[1]
            console.log('>>> check token: ', token)

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                console.log('>>> check decoded: ', decoded)
                req.user = {
                    name: decoded.name,
                    email: decoded.email,
                    createBy: 'NganHa'
                }
                next()
            } catch (error) {
                return res.status(401).json({
                    message: "Token expired / Token invalid"
                })
            }

        }
        else {
            return res.status(401).json({
                message: "You don't have token / Token expired !!!"
            })
        }
    }


}

module.exports = auth