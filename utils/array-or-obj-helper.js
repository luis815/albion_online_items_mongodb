module.exports = async (i, cb) => {
	if (Array.isArray(i)) {
		for (const k of i) {
			await cb(k);
		}
	} else {
		await cb(i);
	}
};
