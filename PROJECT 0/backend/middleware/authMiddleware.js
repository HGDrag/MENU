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

const checkRole = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');
        if(!req.user.role || req.user.role !== 'User' ) {
            next();
        } else {
            throw new Error();
        }
    } catch (error) {
            res.status(403);
            throw new Error('Forbidden');
        }
});


const checkOwner = asyncHandler( async (req, res, next) => {
    let token;
    token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).populate('reviews').select('-password');

        if (!req.user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { id } = req.params;
        
        // Check if the user is an admin
        if (req.user.role === 'Admin') {
            return next();
        }

        // Check if the user has created the review
        const userReview = req.user.reviews.find(review => review._id.toString() === id);
        if (userReview) {
            return next();
        }

        // If neither condition is met, deny access
        return res.status(403).json({ message: 'Access Denied' });
    } catch (error) {
            res.status(400);
            throw new Error('Invalid Token');
    }
})


export { protect, checkRole, checkOwner }