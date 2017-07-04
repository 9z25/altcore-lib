'use strict';

var altcore = module.exports;

// module information
altcore.version = 'v' + require('./package.json').version;
altcore.versionGuard = function(version) {
  if (version !== undefined) {
    var message = 'More than one instance of altcore-lib found. ' +
      'Please make sure to require altcore-lib and check that submodules do' +
      ' not also include their own altcore-lib dependency.';
    throw new Error(message);
  }
};
altcore.versionGuard(global._altcore);
global._altcore = altcore.version;

// crypto
altcore.crypto = {};
altcore.crypto.BN = require('./lib/crypto/bn');
altcore.crypto.ECDSA = require('./lib/crypto/ecdsa');
altcore.crypto.Hash = require('./lib/crypto/hash');
altcore.crypto.Random = require('./lib/crypto/random');
altcore.crypto.Point = require('./lib/crypto/point');
altcore.crypto.Signature = require('./lib/crypto/signature');

// encoding
altcore.encoding = {};
altcore.encoding.Base58 = require('./lib/encoding/base58');
altcore.encoding.Base58Check = require('./lib/encoding/base58check');
altcore.encoding.BufferReader = require('./lib/encoding/bufferreader');
altcore.encoding.BufferWriter = require('./lib/encoding/bufferwriter');
altcore.encoding.Varint = require('./lib/encoding/varint');

// utilities
altcore.util = {};
altcore.util.buffer = require('./lib/util/buffer');
altcore.util.js = require('./lib/util/js');
altcore.util.preconditions = require('./lib/util/preconditions');

// errors thrown by the library
altcore.errors = require('./lib/errors');

// main bitcoin library
altcore.Address = require('./lib/address');
altcore.Block = require('./lib/block');
altcore.MerkleBlock = require('./lib/block/merkleblock');
altcore.BlockHeader = require('./lib/block/blockheader');
altcore.HDPrivateKey = require('./lib/hdprivatekey.js');
altcore.HDPublicKey = require('./lib/hdpublickey.js');
altcore.Networks = require('./lib/networks');
altcore.Opcode = require('./lib/opcode');
altcore.PrivateKey = require('./lib/privatekey');
altcore.PublicKey = require('./lib/publickey');
altcore.Script = require('./lib/script');
altcore.Transaction = require('./lib/transaction');
altcore.URI = require('./lib/uri');
altcore.Unit = require('./lib/unit');

// dependencies, subject to change
altcore.deps = {};
altcore.deps.bnjs = require('bn.js');
altcore.deps.bs58 = require('bs58');
altcore.deps.Buffer = Buffer;
altcore.deps.elliptic = require('elliptic');
altcore.deps.groestlhash = require('groestl-hash-js');
altcore.deps._ = require('lodash');

// Internal usage, exposed for testing/advanced tweaking
altcore.Transaction.sighash = require('./lib/transaction/sighash');
