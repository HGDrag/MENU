import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToke.js';
import User from '../models/userModel.js';

// @desc AUTH USER / set token
// route POST /api/users/auth
// @access public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate('reviews');

    if(user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            reviews: user.reviews
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc REGISTER USER
// route POST /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({email});

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if(user) {
        generateToken(res, user._id, user.role);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc LOGOUT USER
// route POST /api/users/logout
// @access public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: 'true',
        expires: new Date(0)
    });

    res.status(200).json({message: 'User logged out'});
});


// @desc GET USER PROFILE
// route GET /api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('reviews');
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            reviews: user.reviews
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc UPDATE USER PROFILE
// route PUT /api/users/profile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate('reviews');

    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password) 
            user.password = req.body.password;

        const updatedUser = await user.save();
        
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: user.role,
            reviews: user.reviews
        });
        
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


export{
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};