const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000;
const mainRouter = require('./routes/index')
require('dotenv').config()

app.use(cors())
app.use(express.json())

app.use('/api/v1', mainRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})