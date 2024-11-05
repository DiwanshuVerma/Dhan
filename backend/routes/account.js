const { default: mongoose } = require('mongoose')
const { Account } = require('../database')
const authMiddleware = require('../middleware')
const express = require('express')

const router = express.Router()

//  -----------------check balance -------------------------

router.get('/balance', authMiddleware, async (req, res) => {
    const userId = req.query.userId || req.userId;
    const account = await Account.findOne({
        userId: userId
    });

    
    if (!account) {
        return res.status(404).json({ message: 'Account not found' });
    }

    res.json({
        balance: account.balance
    })
})

// ---------------------------------transter money route---------------------

// --> below way will work properly but what if money is debited from sender's account then immediately server goes down and that amount not credited into reciever's account
/*
router.post('/transfer', authMiddleware, async (req, res) => {
    const {amount, to} = req.body

    // find sender's account
    const account = await Account.findOne({
        userId: req.userId
    })

    if(account.balance < amount){
        return res.status(400).json({
            message: 'Insufficient balance( garib 😂)'
        })
    }
    
    // find reciever's account
    const toAccount = await Account.findOne({
        userId: to
    })

    if(!toAccount){
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    // decrease money
    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        }
    })

    // credit that debited amount in reciever's balance
    await Account.updateOne({
        userId: to
    }, {
        $inc: {
            balance: amount
        }
    })

    res.status(200).json({
        message: "Transfer successful"
    })
})*/

// -----------this is how real transactions happens, do many thing at a time if anyone fails, abort those all tasks

router.post('/transfer', authMiddleware, async (req, res) => {

    // start session
    const session = await mongoose.startSession()
    
    // ------------------~do-all-or-nothing--------------

    // started transaction, till commiting it if any of the task fails then whole transaction will be failed
    session.startTransaction()
    const {amount, to} = req.body

    // fetch the accounts within the transaction
    const account = await Account.findOne({
        userId: req.userId
    }).session(session)

    if(!account || account.balance < amount){
        await session.abortTransaction()        // abort inbetween if condition does not matches

        return res.status(404).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({userId: to}).session(session)
    if(!account || account.balance < amount){
        await session.abortTransaction()

        return res.status(404).json({
            message: "Invalid account"
        })
    }

    // perform the transaction
    await Account.updateOne( {userId: req.userId}, {$inc: {balance: -amount}}).session(session)
    await Account.updateOne( {userId: to}, {$inc: {balance: amount}}).session(session)


    // commit the transaction
    await session.commitTransaction()

    res.status(200).json({
        message: "Transfer successful"
    })
})
module.exports = router
