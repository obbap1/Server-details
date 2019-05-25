const chalk = require("chalk");
const {isValid} = require('./helpers/is.valid');
const dns = require("./dns");

const useCli = async args => {
	if (args.length > 5 || args.length < 2)
		return console.log(
			chalk.red("Number of Servers should be between 2 - 5")
		);
    const valid = args.every(x => isValid(x));
    console.log({valid});
    return valid ? dns.lookup(args) : console.log(chalk.red("Invalid IP/Web Address"));
};

module.exports = useCli;
