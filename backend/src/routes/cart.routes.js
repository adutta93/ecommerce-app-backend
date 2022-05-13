const express = require('express');
const { addItemToCart, getCartItems } = require('../controller/cart.controller');
const { isSignedIn } = require('../middleware');
const router = express.Router();

router.post('/cart/add-to-cart', isSignedIn, addItemToCart);
//router.post('/user/cart/addToCartByLogin', requireSignin, userMiddleware, addToCart);
// router.post('/cart/get-Cart-Items', isSignedIn, getCartItems);
// //new update
// router.post('/cart/remove-Item', isSignedIn, removeCartItems);
module.exports = router;
