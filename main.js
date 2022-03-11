const fs = require("fs").promises;
const path = require("path");
const exec = require("child_process").exec;
const axios = require("axios").default;

const main = async () => {
	//Get albion online metadata version
	const metaLatestCommitHash = (
		await axios.get(
			"https://api.github.com/repos/broderickhyman/ao-bin-dumps/commits/master",
			{ responseType: "json" }
		)
	).data.sha;

	//Get local version
	const currentMetaVersion = JSON.parse(
		await fs.readFile(path.resolve(__dirname, "./project-config.json"), "utf-8")
	).currentMetaVersion;

	//Compare meta versions
	if (metaLatestCommitHash === currentMetaVersion) {
		return;
	}

	//Since meta versions did not match, compile a new MongoDB collection

	const itemsJson = (
		await axios.get(
			"https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/master/items.json",
			{ responseType: "json" }
		)
	).data;

	const localizationJson = (
		await axios.get(
			"https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/master/localization.json",
			{ responseType: "json" }
		)
	).data;

	console.log(Object.keys(itemsJson));

	//Update project-config.json
	// fs.writeFile(
	// 	path.resolve(__dirname, "./project-config.json"),
	// 	JSON.stringify({
	// 		currentMetaVersion: metaLatestCommitRes.data.sha,
	// 	}),
	// 	"utf-8"
	// );
};

main();
