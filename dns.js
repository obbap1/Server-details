const dns = require('dns');
const Queue = require('better-queue');
const { Spinner } = require('cli-spinner');

const regex = /(\d{1,3}).(\d{1,3}).(\d{1,3}).(\d{1,3})(:\d+)?/;
// eslint-disable-next-line no-undef
const queue = new Queue((input, callback) => {

  // Execute shell to perform trace route

});


// Confirm host name exists
const isHostName = (server) => {
  dns.lookup(`${server}`, (err, address, family) => {
    if (err) console.log(`\n Oops! An error occured locating server, ${server}`);
    if (address) {
      console.log(`\n Server found!, ${server} with address ${address} and family ${family} is valid!...`);
      // Push to queue
      queue.push(server);
    }
  });
};

// Confirm IP address
const isIpAddress = (server) => {
  dns.lookupService(`${server}`);
};

module.exports = {
  // Validate if server or IP address exists
  lookup: async (servers) => {
    // Start spinner
    const spinner = new Spinner('Performing lookup...%s');
    spinner.setSpinnerString('|/-\\');
    spinner.start();

    servers.forEach((server) => {
      // eslint-disable-next-line no-unused-expressions
      regex.test(server) ? isIpAddress(server) : isHostName(server);
    });
  },
};
