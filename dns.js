const dns = require("dns");
const Queue = require("better-queue");
const { Spinner } = require("cli-spinner");
const chalk = require("chalk");
const axios = require("axios");
const {isIpValid} = require('./helpers/is.valid');

const spinner = new Spinner("Performing lookup...%s");


// eslint-disable-next-line no-undef
const queue = new Queue(
	(batch, callback) => {
		// Execute shell to perform trace rou
		batch.forEach(query => {
			//get details about ip
			axios
				.get(`http://ip-api.com/json/${query.address}`)
				.then(res => {
					console.log(
						chalk.green(
							"------------------------------------------------------------"
						)
					);
					console.log(
						`\n ${chalk.blueBright(
							query.server
						)} is located in ${chalk.yellow(
							res.data.city
						)}, ${chalk.red(res.data.country)} \n`
					);
					console.log(
						`Internet Service Provider -> ${chalk.magenta(
							res.data.isp
						)} with latitude ${chalk.cyan(
							res.data.lat
						)} and longitude ${chalk.greenBright(res.data.lon)}\n`
					);
					console.log(
						`Timezone -> ${chalk.cyanBright(
							res.data.timezone
						)}, Region: ${chalk.magentaBright(res.data.regionName)}`
					);
					console.log(
						chalk.green(
							"------------------------------------------------------------"
						)
					);
					callback();
				})
				.catch(e => {
					console.log(chalk.red(`${e.name} - ${e.message}`));
				});
		});
	},
	{ batchSize: 3, maxRetries: 10, retryDelay: 1000, maxTimeout: 10000 }
);

queue.on("drain", () => {
	console.log("Done and Dusted 😄");
	spinner.stop();
});

// Confirm host name exists
const isHostName = server => {
	dns.lookup(`${server}`, (err, address, family) => {
		if (err)
			console.log(`\n Oops! An error occured locating server, ${server}`);
		if (address) {
			console.log(
				`\n Server found!, ${server} with address ${address} and family ${family} is valid!...`
			);
			// Push to queue
			queue.push({ address, server });
		}
	});
};

// Confirm IP address
const isIpAddress = server => {
	// Check if port number is included
	const serverAndPort = server.split(":");

	try {
		dns.lookupService(
			`${serverAndPort[0]}`,
			`${serverAndPort[1]}`,
			(err, hostname, service) => {
				if (err)
					console.error(
						chalk.red(
							`\n Oops! An error occured locating server, ${server}`
						)
					);
				else {
					console.log(
						`\n Server found!, ${server} with hostname ${hostname} and service ${service} is valid!...`
					);
					queue.push(serverAndPort[0]);
				}
			}
		);
	} catch (e) {
		console.error(chalk.red(e.message));
	}
};

module.exports = {
	// Validate if server or IP address exists
	lookup: async servers => {
		// Start spinner

		spinner.setSpinnerString("|/-\\");
		spinner.start();

		servers.forEach(server => {
			// eslint-disable-next-line no-unused-expressions
			isIpValid(server) ? isIpAddress(server) : isHostName(server);
		});
	}
};
