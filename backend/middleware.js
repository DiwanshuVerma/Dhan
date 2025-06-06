require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET

const jwt = require('jsonwebtoken')

const authMiddleware =  (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(403).json({
            message: 'Invalid token'
        })
    }
    const token = authHeader.split(' ')[1]
    

    try{
        const decoded = jwt.verify(token, JWT_SECRET)

        if(decoded.userId){
            req.userId = decoded.userId
            next()
        }else {
            return res.status(403).json({
                message: 'User not found'
            })
        }

    } catch(error){
        console.log('jwt error: ', error.message)
        console.log('jwt token ', token)
        return res.status(403).json({
            message: 'Invalid/expired token'
        })
    }
}

module.exports = authMiddleware