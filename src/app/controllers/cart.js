import Cart from '../models/cart.js';
import { body, param, validationResult } from 'express-validator';

export const getUserCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id }).populate('products.productId');
        
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found or cart is empty'
            });
        }

        res.status(200).json({
            success: true,
            data: cart
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve cart',
            error: err.message
        });
    }
};

export const addToCart = [
    body('productId').notEmpty().withMessage('Product ID is required'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const { productId, quantity } = req.body;

        try {
            const cart = await Cart.findOneAndUpdate(
                { userId: req.user._id },
                { $push: { products: { productId, quantity } } },
                { new: true, upsert: true }
            );

            res.status(201).json({
                success: true,
                data: cart
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: 'Failed to add product to cart',
                error: err.message
            });
        }
    }
];

export const removeFromCart = [
    param('productId').notEmpty().withMessage('Product ID is required'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        try {
            const { productId } = req.params;

            const cart = await Cart.findOneAndUpdate(
                { userId: req.user._id },
                { $pull: { products: { productId } } },
                { new: true }
            );

            if (!cart) {
                return res.status(404).json({
                    success: false,
                    message: 'Cart not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Product removed from cart',
                data: cart
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: 'Failed to remove product from cart',
                error: err.message
            });
        }
    }
];

export const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOneAndUpdate(
            { userId: req.user._id },
            { $set: { products: [] } },
            { new: true }
        );

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Cart cleared',
            data: cart
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to clear cart',
            error: err.message
        });
    }
};

