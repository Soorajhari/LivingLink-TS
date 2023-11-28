import { userModel } from "../models/users";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

const Asecret = process.env.SECRET_TOKEN ||"";
const Rsecret = process.env.SECRET_RTOKEN ||"";

const verify = async (req: Request, res: Response, next: NextFunction) => {
  try {
     const authHeader = req.headers.authorization;
     const token = authHeader?.split(' ')[1];
    console.log(token);
    if (!token) {
      return res.json({ msg: "You are not authorized" });
    }
    const decoded = jwt.verify(token, Asecret) as { [key: string]: any };
    console.log(decoded._id+"srerre")
    if (!decoded) {
      return res.json({ msg: "You are not authorized" });
    }

    const user = await userModel.findOne({ _id: decoded._id });
     console.log(user +"sooraj hari")
    if (!user) {
      return res.json({ msg: "User not found" });
    }

    req.user = user; 
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default verify;

