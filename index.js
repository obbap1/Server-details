/* eslint-disable no-console */
const chalk = require('chalk');
const { prompt } = require('enquirer');

const kickStartApplication = async () => {
  console.log(chalk.blue('Welcome!, Find the server closest to you'));

  // Get number of servers

  const numberOfServers = {
    type: 'input',
    name: 'numberOfServers',
    message: 'How many servers do you want to compare ? \n (Minimum Number: 1 Maximum Number: 5)',
    initial: '2',
    validate: input => !isNaN(Number(input)) && Number(input) < 5 && Number(input) > 1,
  };

  // Enter Server Addresses
  const serverAddresses = {
    type: 'form',
    name: 'serverAddresses',
    message: 'Enter the Websites / IP addresses of the servers',
    limit: 5,
    choices: null,
  };

  prompt(numberOfServers)
    .then((answer) => {
      console.log(answer);
      serverAddresses.choices = Array(Number(answer.numberOfServers)).fill('Enter Address:');
      prompt(serverAddresses)
        .then((ans) => {
          console.log(ans);
        });
    })
    .catch(console.error);
};

kickStartApplication();
