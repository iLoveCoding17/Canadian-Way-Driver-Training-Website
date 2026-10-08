const mongoose = require("mongoose");

const dbConnect = async () => {
	if (mongoose.connection.readyState >= 1) return;
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	} catch {
		throw new Error("MongoDB connection failed");
	}
};

module.exports = dbConnect;
