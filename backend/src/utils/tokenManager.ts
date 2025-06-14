import { NextFunction , Request, Response } from "express";
import jwt from "jsonwebtoken";

export const createToken = (id: string, email: string, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
    return token;
};

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.signedCookies[`${process.env.COOKIE_NAME}`];
    if(!token || token.trim() === ""){
        res.status(401).json({ message: "Token Not Recieved" })
    }
    //console.log(token);
    return new Promise<void>((resolve, reject) => { 
        return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if(err) {
                reject(err.message);
                res.status(401).json({ message: "Token Expired" });
            } else {
                //console.log("Token Verification Successful");
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        });
    });
};

