const express = require('express');
const router = express.Router();
const { getCartByUser, updateCart, deleteCart, deleteCartItem } = require('../controllers/cartController');
const { authenticateUser } = require('../middlewares/auth');

router.get('/:userId', authenticateUser, getCartByUser);

router.put('/:userId', authenticateUser, updateCart);

router.delete('/:userId', authenticateUser, deleteCart);

router.delete('/:userId/item/:productId', authenticateUser, deleteCartItem);

module.exports = router;
