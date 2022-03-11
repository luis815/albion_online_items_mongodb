const mongoose = require("mongoose");

const COLLECTION = "adp-items";

const itemSchema = new mongoose.Schema(
	{
		"@uniquename": {
			type: String,
			unique: true,
			required: true,
		},
	},
	{ collection: COLLECTION, strict: false }
);

const items = mongoose.model(COLLECTION, itemSchema);

module.exports = {
	async create(item) {
		return await items.create(item);
	},
	async findAll() {
		return await items.find({}).lean().exec();
	},
};
