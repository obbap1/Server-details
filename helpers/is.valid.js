//Check if web or ip address is valid

const isValid = input => {
	const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i;
	return regex.test(input);
};

const isIpValid = input => {
	const regex = /(\d{1,3}).(\d{1,3}).(\d{1,3}).(\d{1,3})(:\d+)?/;
	return regex.test(input);
};

module.exports = {
	isValid,
	isIpValid
};
