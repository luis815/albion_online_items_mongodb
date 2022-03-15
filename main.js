const fs = require("fs").promises;
const path = require("path");
const crypto = require("crypto");
const axios = require("axios").default;
const mongoose = require("mongoose");
const adpItemsModel = require("./models/adp-items.js");
const adpLocalizationModel = require("./models/adp-localization.js");
const itemsModel = require("./models/items.js");
const arrayOrObjHelperUtil = require("./utils/array-or-obj-helper.js");
const langCodeDictionaryJson = require("./utils/lang-code-dictionary.json");

const main = async () => {
	console.log("Getting albion online metadata version");
	const metaLatestCommitHash = (
		await axios.get(
			"https://api.github.com/repos/broderickhyman/ao-bin-dumps/commits/master",
			{ responseType: "json" }
		)
	).data.sha;

	console.log("Reading local version");
	const currentMetaVersion = JSON.parse(
		await fs.readFile(path.resolve(__dirname, "./project-config.json"), "utf-8")
	).currentMetaVersion;

	console.log("Comparing versions");
	if (metaLatestCommitHash === currentMetaVersion) {
		console.log("Up to date");
		return;
	}

	//Since meta versions did not match, compile a new MongoDB collection
	console.log("Out of date");

	console.log("Connecting to MongoDB");
	await mongoose.connect("mongodb://mongodb:27017/albion");

	console.log("Fetching ao-bin-dumps/items.json");
	const itemsJson = (
		await axios.get(
			"https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/master/items.json",
			{ responseType: "json" }
		)
	).data;

	console.log("Fetching ao-bin-dumps/localization.json");
	const localizationJson = (
		await axios.get(
			"https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/master/localization.json",
			{ responseType: "json" }
		)
	).data;

	// console.log("Bulding adp-items collection");
	// await new Promise((resolve) => setTimeout(resolve, 1000));
	// const itemKeys = Object.keys(itemsJson.items);
	// for (let i = 3; i < itemKeys.length; ++i) {
	// 	let itemValue = itemsJson.items[itemKeys[i]];
	// 	await arrayOrObjHelperUtil(itemValue, async (item) => {
	// 		console.log(`@uniquename: ${item["@uniquename"]}`);
	// 		await adpItemsModel.create(item);
	// 	});
	// }

	// console.log("Building adp-localization collection");
	// await new Promise((resolve) => setTimeout(resolve, 1000));
	// for (const entry of localizationJson.tmx.body.tu) {
	// 	if ("tuv" in entry && "@tuid" in entry) {
	// 		console.log(`@tuid: ${entry["@tuid"]}`);
	// 		await adpLocalizationModel.create(entry);
	// 	}
	// }

	// console.log("Building item collection");
	// await new Promise((resolve) => setTimeout(resolve, 1000));
	// const itemDocs = await adpItemsModel.findAll();
	// for (const item of itemDocs) {
	// 	const uniqueName = item["@uniquename"];
	// 	const shopCategory = item["@shopcategory"];
	// 	const shopSubCategory = item["@shopsubcategory1"];
	// 	const tier = Number(item["@tier"]);
	// 	const maxQuality = Number(item["@maxqualitylevel"] || "1");

	// 	const localization = await adpLocalizationModel.findItemByUniqueName(
	// 		uniqueName
	// 	);

	// 	const availableEnchantments = [];

	// 	if ("enchantments" in item) {
	// 		availableEnchantments.push(0);
	// 		await arrayOrObjHelperUtil(
	// 			item.enchantments.enchantment,
	// 			async (enchantment) => {
	// 				availableEnchantments.push(Number(enchantment["@enchantmentlevel"]));
	// 			}
	// 		);
	// 	} else if ("@enchantmentlevel" in item) {
	// 		availableEnchantments.push(Number(item["@enchantmentlevel"]));
	// 	} else {
	// 		availableEnchantments.push(0);
	// 	}

	// 	for (const enchantment of availableEnchantments) {
	// 		for (let quality = 1; quality <= maxQuality; ++quality) {
	// 			console.log(`${uniqueName} / ${enchantment} / ${quality}`);

	// 			try {
	// 				const itemDoc = await itemsModel.create({
	// 					uniqueName,
	// 					shopCategory,
	// 					shopSubCategory,
	// 					tier,
	// 					enchantment,
	// 					quality,
	// 					availableEnchantments,
	// 					maxQuality,
	// 					hash: crypto
	// 						.createHash("sha256")
	// 						.update(uniqueName)
	// 						.update(tier.toString())
	// 						.update(enchantment.toString())
	// 						.update(quality.toString())
	// 						.digest("hex"),
	// 					...Object.fromEntries(
	// 						new Map(
	// 							localization.tuv.map((obj) => [
	// 								langCodeDictionaryJson[obj["@xml:lang"]],
	// 								obj.seg,
	// 							])
	// 						)
	// 					),
	// 				});
	// 			} catch (err) {
	// 				console.error(err.message);
	// 			}
	// 		}
	// 	}
	// }

	console.log("Disconnecting from MongoDB");
	await mongoose.disconnect();

	console.log("Updating project-config.json");
	fs.writeFile(
		path.resolve(__dirname, "./project-config.json"),
		JSON.stringify({
			currentMetaVersion: "metaLatestCommitHash",
		}),
		"utf-8"
	);
};

main();
