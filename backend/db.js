const mongoose = require("mongoose");

module.exports = () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	try {
        /**
 * Connect to MongoDB database.
 *
 * @param {string} process.env.MONGODB_URI - MongoDB connection string.
 * @param {Object} { useNewUrlParser, useUnifiedTopology } - Options for MongoDB connection.
 */
		mongoose.connect(process.env.MONGO_URI, connectionParams);
		console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	}
};  