import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, invalid token');
        }

    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

//check for role in a new function
//EXAMPLE CODE 
const checkRole = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');
        if(req.user.role !== 'User') {
            next();
        } else {
            throw new Error();
        }
    } catch (error) {
            res.status(403);
            throw new Error('Forbidden, No permission');
        }
});


export { protect, checkRole }