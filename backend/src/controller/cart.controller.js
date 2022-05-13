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
			let condition, update;
			const ItemInCart = cart.cartItems.find((c) => c.product == req.body.cartItems.product);
			if (ItemInCart) {
				condition = { user: req.user._id, 'cartItems.product': req.body.cartItems.product };
				update = {
					$set: {
						'cartItems.$': {
							...req.body.cartItems,
							quantity: ItemInCart.quantity + req.body.cartItems.quantity,
						},
					},
				};
			} else {
				condition = { user: req.user._id };
				update = {
					$push: {
						cartItems: req.body.cartItems,
					},
				};
			}
			Cart.findOneAndUpdate(condition, update).exec((err, _cart) => {
				if (err) return res.status(400).json({ err });
				if (_cart) {
					return res.status(200).json({ cart: _cart });
				}
			});
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

exports.getCartItems = (req, res) => {
	//const { user } = req.body.payload;
	//if(user){
	Cart.findOne({ user: req.user._id })
		.populate('cartItems.product', '_id name price productPictures')
		.exec((error, cart) => {
			if (error) return res.status(400).json({ error });
			if (cart) {
				let cartItems = {};
				cart.cartItems.forEach((item, index) => {
					cartItems[item.product._id.toString()] = {
						_id: item.product._id.toString(),
						name: item.product.name,
						img: item.product.productPictures[0].img,
						price: item.product.price,
						qty: item.quantity,
					};
				});
				res.status(200).json({ cartItems });
			}
		});
	//}
};
