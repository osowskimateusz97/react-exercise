export const convertTime = (time) => {
	// convert seconds to MM:SS
	if (isNaN(time)) return 0;
	const result = new Date(time * 1000).toISOString().substr(14, 5);
	return result;
};
