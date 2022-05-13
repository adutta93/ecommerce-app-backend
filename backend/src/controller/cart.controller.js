const Cart = require('../models/cart.model');

function runUpdate(condition, updateData) {
	return new Promise((resolve, reject) => {
		//you update code here

		Cart.findOneAndUpdate(condition, updateData, { upsert: true })
			.then((result) => resolve())
			.catch((err) => reject(err));
	});
}
exports.addItemToCart = (req, res) => {
	Cart.findOne({ user: req.user._id }).exec((err, cart) => {
		if (err) return res.status(400).json({ err });
		if (cart) {
			// return res.status(201).json({ message: cart });
			const ItemInCart = cart.cartItems.find((c) => c.product == req.body.cartItems.product);
			if (ItemInCart) {
				Cart.findOneAndUpdate(
					{ user: req.user._id, 'cartItems.product': req.body.cartItems.product },
					{
						$set: {
							'cartItems.$': {
								...req.body.cartItems,
								quantity: ItemInCart.quantity + req.body.cartItems.quantity,
							},
						},
					}
				).exec((err, _cart) => {
					if (err) return res.status(400).json({ err });
					if (_cart) return res.status(201).json({ cart: _cart });
				});
			} else {
				Cart.findOneAndUpdate(
					{ user: req.user._id },
					{
						$push: {
							cartItems: req.body.cartItems,
						},
					}
				).exec((err, _cart) => {
					if (err) return res.status(400).json({ err });
					if (_cart) {
						return res.status(200).json({ cart: _cart });
					}
				});
				// return res.status(201).json({ cart: cart });
			}
		} else {
			//if cart not exists
			const cart = new Cart({
				user: req.user._id,
				cartItems: [req.body.cartItems],
			});
			cart.save((error, cart) => {
				if (error) return res.status(400).json({ error });
				if (cart) {
					return res.status(201).json({ cart });
				}
			});
		}
	});
};
