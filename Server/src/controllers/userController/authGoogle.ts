


// var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Request, Response } from 'express';
import dotenv from'dotenv'
dotenv.config()
import { userModel } from 'models/users';


interface Profile {
    id: string;
    displayName: string;
    emails?: { value: string; verified: boolean }[];
  
  }

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: 'http://localhost:5000/auth/google/callback',
      passReqToCallback: true,
    },
   function(request: Request, accessToken: string, refreshToken: string, profile: Profile, done: Function) {
       done(null,profile)
   }
  )
)
     
      

passport.serializeUser((user,done)=>{
    done(null,user)
})


passport.deserializeUser<any>((user,done)=>{
    done(null,user)
})


