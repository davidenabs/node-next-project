import { Router } from 'express';
import {
    registerUser,
    loginUser,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getUserCart,
    addToCart
} from './controllers/index.js';
import { authenticate } from './middlewares/index.js';

const router = Router();

// User routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Product routes (protected)
router.get('/products', getProducts);
router.post('/products', authenticate, createProduct);
router.put('/products/:id', authenticate, updateProduct);
router.delete('/products/:id', authenticate, deleteProduct);

// Cart routes
router.get('/cart', authenticate, getUserCart);
router.post('/cart', authenticate, addToCart);

export default router;
