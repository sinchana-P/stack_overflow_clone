// const express = require('express')
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import userRoutes from './routes/users.js'
import questionRoutes from './routes/Questions.js'

const app = express();  
// now this "app" is our Express SERVER

// middlewares :  app.use();
app.use(express.json({limit: "30mb", extended: true}))  // our backend is REST API...  coz, we r receiving request in json format & we r RESPONDING in json format
app.use(express.urlencoded({limit: "30mb", extended: true}))
app.use(cors());

app.get('/', (req, res) => {
    res.send("This is a stack overflow clone API")
})


app.use('/user', userRoutes) 

// url:     /questions/Ask
// url:     /questions/get
app.use('/questions', questionRoutes) 


const PORT = process.env.PORT || 5000       // express app to listen in the port no : "PORT" from frontend

// Database connection :
const CONNECTION_URL = "mongodb+srv://admin:admin@stack-overflow-clone.nkfpvpa.mongodb.net/myStackData"

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => {console.log(`server running on port ${PORT}`)}))  // on success   // we r saying express app to listen in the port no : "PORT" from frontend, if the connection is SUCCESS.
    .catch((err) => console.log(err.message))                                             // on failure


/* 
Note :
files path-->

index.js ---> routes / users.js ---> controllers / auth.js

_______________________________________________________________________________________________________
URL : steps

1. user/signup
2. user/login

3. 







*/    

