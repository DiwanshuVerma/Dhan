const mongoose = require('mongoose')
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to mongodb')
    }).catch(error => {
        console.log('Error while connecting to mongo: ', error)
    })

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,   // The username field must be filled
        unique: true,  // must be unique (no two users can have the same username
        trim: true,    // Removes any leading/trailing spaces   
        lowercase: true,     // The username will always be saved in lowercase
        // minLength: 3,
        // maxLength: 30
    },
    password: {
        type: String,
        required: true,
        // minLength: 6
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,  // reference to user model
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const User = mongoose.model('User', userSchema)
const Account = mongoose.model('Account', accountSchema)

module.exports = {
    User,
    Account
}