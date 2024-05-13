import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import UserRoute from './route/user.route.js'

const app = express()
dotenv.config()
app.use(bodyParser.json())
const PORT = 3500;

//Database Connet
try {
    mongoose.connect(process.env.DATABASE_URL)
    console.log('Database connectd')
} catch (error) {
    console.log('Error' , error)
}


app.get('/' , (req , res) => {
    res.send('Hello World')
})

//Api Routes
app.use('/user', UserRoute)



//App Listerner
app.listen(PORT , () => {
    console.log('Server runing on port ' + PORT)
});