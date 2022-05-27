const Product = require('../models/product.model');
const shortid = require('shortid');
const slugify = require('slugify');
const Category = require('../models/category.model');

exports.createProduct = async (req, res) => {
	// res.status(200).json({ file: req.files, body: req.body });

	const { name, price, description, category, quantity, createdBy } = req.body;
	let productPictures = [];

	if (req.files?.length > 0) {
		productPictures = req.files.map((file) => {
			return { img: file.filename };
		});
	}

	const newProduct = new Product({
		name,
		slug: slugify(name),
		price,
		quantity,
		description,
		productPictures,
		category,
		createdBy: req.user._id,
	});

	const product = newProduct.save();
	if (!product) {
		return res.status(400).json({ error: 'unable to save product' });
	}
	res.status(201).json({ success: 'Product saved successfully', product: { product } });
};
exports.getProductsBySlug = (req, res) => {
	const { slug } = req.params;
	Category.findOne({ slug: slug })
		.select('_id type')
		.exec((error, category) => {
			if (error) {
				return res.status(400).json({ error });
			}

			if (category) {
				Product.find({ category: category._id }).exec((error, products) => {
					if (error) {
						return res.status(400).json({ error });
					}

					if (category.type) {
						if (products.length > 0) {
							res.status(200).json({
								products,
								priceRange: {
									under5k: 5000,
									under10k: 10000,
									under15k: 15000,
									under20k: 20000,
									under30k: 30000,
								},
								productsByPrice: {
									under5k: products.filter((product) => product.price <= 5000),
									under10k: products.filter((product) => product.price > 5000 && product.price <= 10000),
									under15k: products.filter((product) => product.price > 10000 && product.price <= 15000),
									under20k: products.filter((product) => product.price > 15000 && product.price <= 20000),
									under30k: products.filter((product) => product.price > 20000 && product.price <= 30000),
								},
							});
						}
					} else {
						res.status(200).json({ products });
					}
				});
			}
		});
};

exports.getProductDetailsById = async (req, res) => {
	const { productId } = req.params;
	if (!productId) {
		return res.status(400).json({ error: 'Params required' });
	}
	const product = await Product.findOne({ _id: productId });
	if (!product) {
		return res.status(400).json({ error: 'could not find product' });
	}
	res.status(200).json({ product });
};

// new update
exports.deleteProductById = async (req, res) => {
	const { productId } = req.body.payload;
	if (productId) {
		const result = await Product.deleteOne({ _id: productId });
		if (result) {
			res.status(202).json({ result });
		}
		return res.status(400).json({ error: 'can not delete product' });
	}
	res.status(400).json({ error: 'Params required' });
};

// exports.getProducts = async (req, res) => {
// 	const products = await Product.find({ createdBy: req.user._id })
// 		.select('_id name price quantity slug description productPictures category')
// 		.populate({ path: 'category', select: '_id name' })
// 		.exec();

// 	res.status(200).json({ products });
// };

exports.getProducts = async (req, res) => {
	const products = await Product.find();
	res.status(200).json({ products });
};
