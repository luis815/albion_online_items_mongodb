const mongoose = require("mongoose");

const COLLECTION = "adp-localization";

const localizationSchema = new mongoose.Schema(
	{
		"@tuid": {
			type: String,
			unique: true,
			required: true,
		},
		tuv: {
			type: Object,
			required: true,
		},
	},
	{ collection: COLLECTION }
);

const localization = mongoose.model(COLLECTION, localizationSchema);

module.exports = {
	async create(entry) {
		return await localization.create(entry);
	},
	async findItemByUniqueName(UniqueName) {
		return await localization
			.findOne({ "@tuid": `@ITEMS_${UniqueName}` })
			.lean()
			.exec();
	},
};
