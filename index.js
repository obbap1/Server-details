#!/usr/bin/env node
/* eslint-disable no-console */
const chalk = require("chalk");
const { prompt } = require("enquirer");
const emoji = require("node-emoji");
const useCli = require("./use.cli");
const dns = require("./dns");
const {isValid} = require('./helpers/is.valid');

// eslint-disable-next-line no-useless-escape
const kickStartApplication = async () => {

  const [,, ...args] = process.argv;
  
  if(args.length > 0){
    //use cli
    return useCli(args);
  }

  console.log(chalk.blue("Welcome!, Find the details of your servers"));
  
	// Get number of servers

	const numberOfServers = {
		type: "input",
		name: "numberOfServers",
		message:
			"How many servers do you need info on ? \n (Minimum Number: 1 Maximum Number: 5)",
		initial: "2",
		validate: input =>
			(!isNaN(Number(input)) && Number(input) <= 5 && Number(input) > 1) ||
			"Number of Servers should be between 2 - 5"
	};

	// Enter Server Addresses
	const serverAddresses = {
		type: "form",
		name: "serverAddresses",
		message:
			"Enter the Host Names / IPv4 addresses (with port, if necessary) of the servers",
		limit: 5,
		choices: null,
		validate: form =>
			Object.values(form).every(address => isValid(address)) ||
			"Invalid IP/Web Address"
	};

	prompt(numberOfServers)
		.then(answer => {
			serverAddresses.choices = Array(
				Number(answer.numberOfServers)
			).fill(`${emoji.find("computer").emoji}  Server`);

			serverAddresses.choices.forEach((item, index, array) => {
				// eslint-disable-next-line no-param-reassign
				array[index] = `${item} ${index + 1}`;
			});

			prompt(serverAddresses)
				.then(ans => {
					console.log(ans);

					dns.lookup(Object.values(ans.serverAddresses));
				})
				.catch(e => console.error(e));
		})
		.catch(e => console.error(e));
};

module.exports = {
  kickStartApplication
}

//Run application
kickStartApplication();
