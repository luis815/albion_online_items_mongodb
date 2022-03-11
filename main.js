const fs = require("fs").promises;
const path = require("path");
const axios = require("axios").default;

const main = async () => {
	//Get albion online metadata version
	const metaLatestCommitRes = await axios.get(
		"https://api.github.com/repos/broderickhyman/ao-bin-dumps/commits/master",
		{ responseType: "json" }
	);

	//Get local version
	const projectConfig = JSON.parse(
		await fs.readFile(path.resolve(__dirname, "./project-config.json"), "utf-8")
	);

	//Compare meta versions
	if (metaLatestCommitRes.data.sha === projectConfig.currentMetaVersion) {
		return;
	}

	//Since meta versions did not match, compile a new MongoDB collection
	

	//Update project-config.json
	fs.writeFile(
		path.resolve(__dirname, "./project-config.json"),
		JSON.stringify({
			currentMetaVersion: metaLatestCommitRes.data.sha,
		}),
		"utf-8"
	);
};

main();
