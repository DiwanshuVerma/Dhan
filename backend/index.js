const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000;
const mainRouter = require('./routes/index')
require('dotenv').config()

app.use(cors())
app.use(express.json())

app.use('/api/v1', mainRouter)

const url = process.env.backendURI

setInterval(async () => {
    await fetch(url)
        .then(res => {
            console.log(`Server restarted at ${new Date().toISOString()}: status code: ${res.status}`)
        })
        .catch(error => {
            console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
          });
}, 30000)


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})