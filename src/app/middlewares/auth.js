import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({
        success: false,
        message: 'Access Denied'
    });

    console.log(token);
    

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Invalid Token'
        });
    }
};

export const isAdmin = (req, res, next) => {
    if (!req.user.isAdmin) return res.status(401).json({
        success: false,
        message: 'Access Denied, only admins'
    });
    next();
};