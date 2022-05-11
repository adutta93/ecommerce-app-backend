require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const colors = require('colors/safe');
const cors = require('cors');

app.use(cors());
app.use(express.json());
//routes
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin/auth.admin.routes');
// const categoryRoutes = require("./routes/category");
// const productRoutes = require("./routes/product");
// const cartRoutes = require("./routes/cart");
// const initialDataRoutes = require("./routes/admin/initialData");
// const pageRoutes = require("./routes/admin/page");
// const addressRoutes = require("./routes/address");
// const orderRoutes = require("./routes/order");
// const adminOrderRoute = require("./routes/admin/order.routes");

const uri = 'mongodb+srv://akash-med:JVKnKqv7awi9vxsl@cluster0.hiynq.mongodb.net/akash-med?retryWrites=true&w=majority';
mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log(colors.brightMagenta('MongoDB Successfully connected'));
	})
	.catch((err) => console.log(`Error`, err));

// app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
// app.use("/api", categoryRoutes);
// app.use("/api", productRoutes);
// app.use("/api", cartRoutes);
// app.use("/api", initialDataRoutes);
// app.use("/api", pageRoutes);
// app.use("/api", addressRoutes);
// app.use("/api", orderRoutes);
// app.use("/api", adminOrderRoute);

const PORT = process.env.PORT || 2000;
app.listen(process.env.PORT, () => {
	console.clear();
	console.log(colors.brightMagenta(`App is running on port ${PORT}`));
});
