var createKeccakHash = require('keccak');

function toBuffer(v) {
  if (!Buffer.isBuffer(v)) {
    if (Array.isArray(v)) {
      v = Buffer.from(v)
    } else if (typeof v === 'string') {
      if (exports.isHexString(v)) {
        v = Buffer.from(exports.padToEven(exports.stripHexPrefix(v)), 'hex')
      } else {
        v = Buffer.from(v)
      }
    } else if (typeof v === 'number') {
      v = exports.intToBuffer(v)
    } else if (v === null || v === undefined) {
      v = Buffer.allocUnsafe(0)
    } else if (v.toArray) {
      // converts a BN to a Buffer
      v = Buffer.from(v.toArray())
    } else {
      throw new Error('invalid type')
    }
  }
  return v
}

function sha3(a, bits) {
  a = toBuffer(a);
  if (!bits) bits = 256

  return createKeccakHash('keccak' + bits).update(a).digest()
}

function publicToAddress(pubKey, sanitize) {
  pubKey = toBuffer(pubKey)
  if (sanitize && (pubKey.length !== 64)) {
    pubKey = secp256k1.publicKeyConvert(pubKey, false).slice(1)
  }
  assert(pubKey.length === 64)
  // Only take the lower 160bits of the hash
  return sha3(pubKey).slice(-20)
}

function padTo32(msg) {
  while (msg.length < 32) {
    msg = Buffer.concat([new Buffer([0]), msg]);
  }
  if (msg.length !== 32) {
    throw new Error("invalid key length: " + msg.length);
  }
  return msg;
}

exports = {'padTo32': padTo32, 'publicToAddress': publicToAddress};
