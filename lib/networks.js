'use strict';
var _ = require('lodash');

var BufferUtil = require('./util/buffer');
var JSUtil = require('./util/js');
var networks = [];
var networkMaps = {};

/**
 * A network is merely a map containing values that correspond to version
 * numbers for each bitcoin network. Currently only supporting "livenet"
 * (a.k.a. "mainnet") and "testnet".
 * @constructor
 */
function Network() {}

Network.prototype.toString = function toString() {
  return this.name;
};

/**
 * @function
 * @member Networks#get
 * Retrieves the network associated with a magic number or string.
 * @param {string|number|Network} arg
 * @param {string|Array} keys - if set, only check if the magic number associated with this name matches
 * @return Network
 */
function get(arg, keys) {
  if (~networks.indexOf(arg)) {
    return arg;
  }
  if (keys) {
    if (!_.isArray(keys)) {
      keys = [keys];
    }
    var containsArg = function(key) {
      return networks[index][key] === arg;
    };
    var matched_networks = [];
    for (var index in networks) {
      if (_.any(keys, containsArg)) {
        matched_networks.push(networks[index]);
      }
    }
    if(matched_networks.length == 1) {
        return matched_networks[0]
    }
    if(matched_networks.length == 0) {
        return undefined;
    }
    return matched_networks
  }
  return networkMaps[arg];
}

/**
 * @function
 * @member Networks#add
 * Will add a custom Network
 * @param {Object} data
 * @param {string} data.name - The name of the network
 * @param {string} data.alias - The aliased name of the network
 * @param {Number} data.pubkeyhash - The publickey hash prefix
 * @param {Number} data.privatekey - The privatekey prefix
 * @param {Number} data.scripthash - The scripthash prefix
 * @param {Number} data.xpubkey - The extended public key magic
 * @param {Number} data.xprivkey - The extended private key magic
 * @param {Number} data.networkMagic - The network magic number
 * @param {Number} data.port - The network port
 * @param {Array}  data.dnsSeeds - An array of dns seeds
 * @return Network
 */
function addNetwork(data) {

  var network = new Network();

  JSUtil.defineImmutable(network, {
    name: data.name,
    alias: data.alias,
    pubkeyhash: data.pubkeyhash,
    privatekey: data.privatekey,
    scripthash: data.scripthash,
    xpubkey: data.xpubkey,
    xprivkey: data.xprivkey,
    addressCheckAlgo: data.addressCheckAlgo,
    transactionHashAlgo: data.transactionHashAlgo
  });

  if (data.networkMagic) {
    JSUtil.defineImmutable(network, {
      networkMagic: BufferUtil.integerAsBuffer(data.networkMagic)
    });
  }

  if (data.port) {
    JSUtil.defineImmutable(network, {
      port: data.port
    });
  }

  if (data.dnsSeeds) {
    JSUtil.defineImmutable(network, {
      dnsSeeds: data.dnsSeeds
    });
  }
  _.each(network, function(value) {
    if (!_.isUndefined(value) && !_.isObject(value)) {
      networkMaps[value] = network;
    }
  });

  networks.push(network);

  return network;

}

/**
 * @function
 * @member Networks#remove
 * Will remove a custom network
 * @param {Network} network
 */
function removeNetwork(network) {
  for (var i = 0; i < networks.length; i++) {
    if (networks[i] === network) {
      networks.splice(i, 1);
    }
  }
  for (var key in networkMaps) {
    if (networkMaps[key] === network) {
      delete networkMaps[key];
    }
  }
}

addNetwork({
  name: 'Bitcoin',
  alias: 'btc',
  pubkeyhash: 0x00,
  privatekey: 0x80,
  scripthash: 0x05,
  xpubkey: 0x0488b21e,
  xprivkey: 0x0488ade4,
  networkMagic: 0xf9beb4d9,
  port: 8333,
  headerHashAlgo: 'double-sha256',
  scriptHashAlgo: 'double-sha256',
  transactionHashAlgo: 'double-sha256',
  dnsSeeds: [
      "seed.b-pay.net",
      "seed.ob1.io"
      "seed.blockchain.info",
      "seed.bloq.com",
  ]
});

addNetwork({
  name: 'GroestlCoin',
  alias: 'grs',
  pubkeyhash: 0x24,
  privatekey: 128,
  scripthash: 0x05,
  xpubkey: 0x0488b21e,
  xprivkey: 0x0488ade4,
  networkMagic: 0xf9beb4d4,
  port: 1331,
  headerHashAlgo: 'groestl',
  scriptHashAlgo: 'groestl',
  transactionHashAlgo: 'single-sha256',
  addressCheckAlgo: 'groestl',
  dnsSeeds: [
    'groestlcoin.org',
    'jswallet.groestlcoin.org',
    'electrum1.groestlcoin.org',
    'electrum2.groestlcoin.org'
  ]
});

addNetwork({
  name: 'Litecoin',
  alias: 'ltc',
  pubkeyhash: 0x30,
  privatekey: 0xb0,
  scripthash: 0x05,
  xpubkey: 0x0488b21e,
  xprivkey: 0x0488ade4,
  networkMagic: 0xfcc1b7dc,
  port: 9333,
  dnsSeeds: [
    'dnsseed.litecointools.com',
    'dnsseed.litecoinpool.org',
    'dnsseed.ltc.xurious.com',
    'dnsseed.koin-project.com',
    'dnsseed.weminemnc.com'
  ]
});

addNetwork({
  name: 'Dash',
  alias: 'dash',
  pubkeyhash: 0x4c,
  privatekey: 0xcc,
  scripthash: 0x10,
  xpubkey: 0x488b21e,    // 'xpub' (Bitcoin Default)
  xprivkey: 0x488ade4,   // 'xprv' (Bitcoin Default)
  networkMagic: 0xbf0c6bbd,
  port: 9999,
  headerHashAlgo: 'x11',
  dnsSeeds: [
    'dnsseed.darkcoin.io',
    'dnsseed.dashdot.io',
    'dnsseed.masternode.io',
    'dnsseed.dashpay.io'
  ]
});

addNetwork({
    name: "ZCash",
    alias: "zec",
    pubkeyhash: 0x1cb8,
    privatekey: 0x80,
    scripthash: 0x1cbd,
    xpubkey: 0x0488b21e,
    xprivkey: 0x0488ade4,
    networkMagic: 0x24e92764,
    port: 8233,
    headerHashAlgo: "double-sha256",
    scriptHashAlgo: "double-sha256",
    transactionHashAlgo: "double-sha256",
});

addNetwork({
    name: "Dogecoin",
    alias: "doge",
    pubkeyhash: 0x1e,
    privatekey: 0x9e,
    scripthash: 0x16,
    xpubkey: 0x0488b21e,
    xprivkey: 0x0488ade4,
    networkMagic: 0xc0c0c0c0,
    port: 22556,
    headerHashAlgo: "scrypt",
    scriptHashAlgo: "double-sha256",
    transactionHashAlgo: "double-sha256",
    dnsSeeds: [
        "seed.dogecoin.com",
        "seed.mophides.com",
        "seed.dglibrary.org",
        "seed.dogechain.info",
    ],
});

addNetwork({
    name: "Syscoin 2.1",
    alias: "sys",
    pubkeyhash: 0x0,
    privatekey: 0x80,
    scripthash: 0x5,
    xpubkey: 0x0488b21e,
    xprivkey: 0x0488ade4,
    port: undefined,
});

addNetwork({
    name: "KittehCoin",
    alias: "meow",
    pubkeyhash: 0x2d,
    privatekey: 0xad,
    scripthash: 0x05,
    xpubkey: 0x0488b21e,
    xprivkey: 0x0488ade4,
    port: undefined,
    headerHashAlgo: "scrypt",
});

addNetwork({
    name: "BunnyCoin",
    alias: "bun",
    pubkeyhash: 0x1a,
    privatekey: 0x9a,
    scripthash: 0x16,
    xpubkey: 0x0488b21e,
    xprivkey: 0x0488ade4,
    port: undefined,
    headerHashAlgo: "scrypt",
});

addNetwork({
    name: "FujiCoin",
    alias: "fjc",
    pubkeyhash: 0x24,
    privatekey: 0xa4,
    scripthash: 0x05,
    xpubkey: 0x0488b21e,
    xprivkey: 0x0488ade4,
    port: undefined,
});


/**
 * @instance
 * @member Networks#livenet
 */
var livenet = get('btc');

addNetwork({
  name: 'testnet',
  alias: 'regtest',
  pubkeyhash: 0x6f,
  privatekey: 0xef,
  scripthash: 0xc4,
  xpubkey: 0x043587cf,
  xprivkey: 0x04358394
});

/**
 * @instance
 * @member Networks#testnet
 */
var testnet = get('testnet');

// Add configurable values for testnet/regtest

var TESTNET = {
  PORT: 18333,
  NETWORK_MAGIC: BufferUtil.integerAsBuffer(0x0b110907),
  DNS_SEEDS: [
    'testnet-seed.bitcoin.petertodd.org',
    'testnet-seed.bluematt.me',
    'testnet-seed.alexykot.me',
    'testnet-seed.bitcoin.schildbach.de'
  ]
};

for (var key in TESTNET) {
  if (!_.isObject(TESTNET[key])) {
    networkMaps[TESTNET[key]] = testnet;
  }
}

var REGTEST = {
  PORT: 18444,
  NETWORK_MAGIC: BufferUtil.integerAsBuffer(0xfabfb5da),
  DNS_SEEDS: []
};

for (var key in REGTEST) {
  if (!_.isObject(REGTEST[key])) {
    networkMaps[REGTEST[key]] = testnet;
  }
}

Object.defineProperty(testnet, 'port', {
  enumerable: true,
  configurable: false,
  get: function() {
    if (this.regtestEnabled) {
      return REGTEST.PORT;
    } else {
      return TESTNET.PORT;
    }
  }
});

Object.defineProperty(testnet, 'networkMagic', {
  enumerable: true,
  configurable: false,
  get: function() {
    if (this.regtestEnabled) {
      return REGTEST.NETWORK_MAGIC;
    } else {
      return TESTNET.NETWORK_MAGIC;
    }
  }
});

Object.defineProperty(testnet, 'dnsSeeds', {
  enumerable: true,
  configurable: false,
  get: function() {
    if (this.regtestEnabled) {
      return REGTEST.DNS_SEEDS;
    } else {
      return TESTNET.DNS_SEEDS;
    }
  }
});

/**
 * @function
 * @member Networks#enableRegtest
 * Will enable regtest features for testnet
 */
function enableRegtest() {
  testnet.regtestEnabled = true;
}

/**
 * @function
 * @member Networks#disableRegtest
 * Will disable regtest features for testnet
 */
function disableRegtest() {
  testnet.regtestEnabled = false;
}

/**
 * @namespace Networks
 */
module.exports = {
  add: addNetwork,
  remove: removeNetwork,
  defaultNetwork: livenet,
  livenet: livenet,
  mainnet: livenet,
  testnet: testnet,
  get: get,
  enableRegtest: enableRegtest,
  disableRegtest: disableRegtest
};
