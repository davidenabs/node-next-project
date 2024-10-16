import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({
            message: 'Failed to register',
            error: err.message,
            success: false
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({
            message: 'User not found',
            success: false
        });
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({
            message: 'invalid password',
            success: false
        });

        const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
        res.json({
            success: true,
            token,
            user: { id: user._id, username: user.username, isAdmin: user.isAdmin }
        });
    } catch (error) {
        res.status(400).json({
            message: 'Failed to login',
            error: err.message,
            success: false
        });
    }
};
