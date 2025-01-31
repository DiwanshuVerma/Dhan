const express = require('express')
require('dotenv').config();
const router = express.Router()
const zod = require('zod')
const authMiddleware = require('../middleware')
const { User, Account } = require('../database')

const JWT_SECRET = require('../config')
const jwt = require('jsonwebtoken')

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
})

// ----------------------Sign-up Route-------------------------------

router.post('/signup', async (req, res) => {
    const body = req.body

    const { success } = signupSchema.safeParse(req.body)

    //validating inputs
    if (!success) {
        return res.status(403).json({
            message: "Invalid inputs",
        })
    }

    // check in db, if user already exists
    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(403).json({
            message: "Email is already taken",
        })
    }
    // create a new user
    const dbUser = await User.create(body)

    const userId = dbUser._id

    await Account.create({
        userId,
        balance: 500 + Math.random() * 9000
    })

    // assign a jwt token to signed user
    const token = jwt.sign({
        userId: dbUser._id,
    }, JWT_SECRET)


    return res.json({
        message: 'Account Created Successfully🎉',
        token
    })
})

// ----------------------Sign-in Route-------------------------------

const signInSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post('/signin', async (req, res) => {
    const { success } = signInSchema.safeParse(req.body)
    if (!success) {
        return res.status(403).json({
            message: "Invalid inputs!!"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })


    if (user) {
        const token = jwt.sign({ userId: user._id }, JWT_SECRET)
        res.json({
            message: "Welcome back to home",
            token
        })
        return
    }

    return res.status(403).json({
        message: "User not found!"
    })
})

// ---------------------show all the users----------------------

router.get('/bulk', async (req, res) => {
    const filter = req.query.filter || ''

    const users = await User.find({
        $or: [
            {
                firstName: {
                    $regex: filter
                }
            }, {
                lastName: {
                    $regex: filter
                }
            }
        ]
    })


    res.json({
        user: users.map(u => ({
            username: u.username,
            firstName: u.firstName,
            lastName: u.lastName,
            _id: u._id
        }))
    })
})

// ----------------------to show logged user's details----------------------------

router.get('/me', authMiddleware, async (req, res) => {
    const user = await User.findById(req.userId)

    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        })
    }

    res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        userId: user._id,
    })
})
module.exports = router