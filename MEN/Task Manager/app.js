const express = require('express')
const path = require('path')
const connectDB = require('./db/connect')
const router = require('./router/routes')
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

require('dotenv').config()
const app = express()
const port = 3000
app.use('/',express.static(path.resolve(__dirname,'public')))
app.use(express.json())

app.use('/api/v1/tasks',router)
app.use(notFound)
app.use(errorHandler)


const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, ()=>{
            console.log(`Server listening on port ${port}....`);
        })
        
    } catch (error) {
        console.log(error);
    }
}

start()
