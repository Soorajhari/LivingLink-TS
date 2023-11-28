import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import * as path from 'path'
import dotenv from 'dotenv'
import {connectToMongoDB} from './utils/base'
import { Router } from './routes/userRoute'
import session from 'express-session'
import passport from "passport"
import { Request, Response ,NextFunction} from "express";
dotenv.config()

var port=process.env.PORT||5000
// console.log(port)
const app = express()



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())


// app.use((err:any, req:Request, res:Response, next:NextFunction) => {
//     if (err.name === 'ValidationError') {
//       let messages = [];
//       for (let error in err.errors) {
//         messages.push(err.errors[error].message);
//       }
//       res.json({ error: messages.join(' ') });
//     } else {
//       next(err);
//     }
//   });
  

// app.use(passport.initialize());
// app.use(passport.session());

// const oneWeek=1000*60*60*24*7
// app.use(
//   session({
//     secret: "sreehari",
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: oneWeek },

//   })
// );


connectToMongoDB().then(()=>{
    app.listen(port,()=>{
        console.log(`server started on port ${port}`)
    })
}) .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

  app.use("/",Router)