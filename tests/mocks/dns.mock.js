const dns = {
    lookup(server, callback){
        console.log(arguments);
        if(callback(address)){
            console.log('address found')
        }
        if(callback(error)){
            console.log('error found')
        }
    },
    lookupService(server, port, callback){
        if(callback(err)){
            console.log('error found')
        }
    }


}

module.exports = dns;