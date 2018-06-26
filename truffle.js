/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */
let HDWalletProvider = require("truffle-hdwallet-provider");
const config = require('./test-env-config.json');


module.exports = {
    networks: {
        development: {
            host: 'localhost',
            port: 8543,
            network_id: '*' // Match any network id
        },
        testenv: {
            provider: function () {
                return new HDWalletProvider(config.mnemonic, "http://ganache.sparkbit.pl:8545")
            },
            network_id: '*' // Match any network id
        }
    }
};
