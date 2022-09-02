import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        // Set token from Bearer token in header
        token = req.headers.authorization.split(' ')[1];
        // Set token from cookie
    }
    // else if (req.cookies.token) {
    //   token = req.cookies.token;
    // }

    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }

    //SECRET KEY - it will return either a error or information of user
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(401, "Token is not valid!"));
        req.user = user;
        next(); // if everything is ok then it will run to next middleware
    })

};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        // if user id inside JWT is equal to id send by client
        if (req.user.id === req.params.id || req.user.isAmin) {
            next();
        }
        else {
            if (err) return next(createError(403, "You are not authorized!"));
        }
    })
}


export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        // if user id inside JWT is equal to id send by client
        if (req.user.isAdmin) {
            next();
        }
        else {
            if (err) return next(createError(403, "You are not authorized!"));
        }
    })
} 