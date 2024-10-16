import Product from '../models/product.js';
import { body, validationResult } from 'express-validator';

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch products',
            error: err.message
        });
    }
};

// Create a new product 
export const createProduct = [
    body('name').notEmpty().withMessage('Product name is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('description').notEmpty().withMessage('Description is required'),

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
            const product = new Product(req.body);
            await product.save();
            res.status(201).json({
                success: true,
                data: product
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: 'Failed to create product',
                error: err.message
            });
        }
    }
];

// Update a product by ID with validation
export const updateProduct = [
    // Validation rules
    body('name').optional().notEmpty().withMessage('Product name is required'),
    body('price').optional().isNumeric().withMessage('Price must be a number'),
    body('description').optional().notEmpty().withMessage('Description is required'),

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
            const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }

            res.status(200).json({
                success: true,
                data: product
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: 'Failed to update product',
                error: err.message
            });
        }
    }
];

// Delete a product by ID
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(204).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete product',
            error: err.message
        });
    }
};
