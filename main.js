const axios = require("axios").default;

const main = async () => {
	const metaLatestCommitRes = await axios.get(
		"https://api.github.com/repos/broderickhyman/ao-bin-dumps/commits/master",
		{ responseType: "json" }
	);

    console.log(metaLatestCommitRes.data);
};

main();
