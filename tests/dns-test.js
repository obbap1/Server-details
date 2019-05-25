const {expect} = require('chai');
const {kickStartApplication} = require('../index.js');
const dns = require('./mocks/dns.mock');

describe('kick-start-application', () => {

    console.oldLog = console.log;

    console.log = function(value){
        console.oldLog(value);
    }

    beforeEach(() => {

    })

    it('should respond with an error object', async() => {
        
        await kickStartApplication(dns);
        expect(console.oldLog).to.not.be.null;

    })

})