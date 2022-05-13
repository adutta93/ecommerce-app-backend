const express = require('express');
const { addItemToCart } = require('../controller/cart.controller');
const { isSignedIn } = require('../middleware');
const router = express.Router();

router.post('/cart/add-to-cart', isSignedIn, addItemToCart);
//router.post('/user/cart/addToCartByLogin', requireSignin, userMiddleware, addToCart);

module.exports = router;
