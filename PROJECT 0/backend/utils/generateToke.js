import jwt from 'jsonwebtoken';

const generateToken = (res, userId, role) => {

    let isAdmin = false;
    
    role === 'Admin' ? isAdmin = true : isAdmin = false;

    const token = jwt.sign({ userId, isAdmin}, process.env.JWT_SECRET, { expiresIn:'30d' });
     
    res.cookie('jwt', token, {
        httpOnly: 'true',
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
    });
}

export default generateToken;