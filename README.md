Altcore Library
=======

[![NPM Package](https://img.shields.io/npm/v/altcore-lib.svg?style=flat-square)](https://www.npmjs.org/package/altcore-lib)
[![Build Status](https://img.shields.io/travis/priestc/altcore-lib.svg?branch=master&style=flat-square)](https://travis-ci.org/priestc/altcore-lib)
[![Coverage Status](https://img.shields.io/coveralls/priestc/altcore-lib.svg?style=flat-square)](https://coveralls.io/r/priestc/altcore-lib)

A pure and powerful JavaScript Bitcoin library. Forked to work with altcoins.

## Principles

Bitcore is a powerful javascript blockchain library. It was originally built to
work with the bitcoin and bitcoin testnet networks, and has the ability to
be extended to other networks, like Namecoin and Litecoin.

Many altcoin communities have forked bitcore-lib to work with their altcoin,
but thus far, the overwheling majority of these forks are done in such a way
that makes them *only* work for that altcoin. This means if you want to build an
application that uses multiple altcoins, you ewill need to include with your application
multiple versions of the same large library that is mostly the same. This is not
much of a problem if you are building a desktop application, but for a web application
(the only platform where javascript has a purpose to exist),
this is unacceptable.

This fork tries to move all modifications from each bitcore fork in existence and
makes them available under a single codebase that is roughly the same size as a single
instance of bitcore-lib.

This fork has expanded the `Networks` functionality found in bitcore-lib, and has kept
everything else (as much as possible) the same as bitcore-lib. The 'livenet' network
has been renamed to 'btc'. Only livenets of each currency is supported. The network
called "testnet" is bitcoin's testnet and is the only testnet supported.

## Get Started

```
npm install altcore-lib
```

```
bower install altcore-lib
```

## Documentation

The complete docs are hosted here: [bitcore documentation](http://bitcore.io/guide/). There's also a [bitcore API reference](http://bitcore.io/api/) available generated from the JSDocs of the project, where you'll find low-level details on each bitcore utility.

- [Read the Developer Guide](http://bitcore.io/guide/)
- [Read the API Reference](http://bitcore.io/api/)

To get community assistance and ask for help with implementation questions, please use our [community forums](https://forum.bitcore.io/).

## Examples

* [Generate a random address](https://github.com/bitpay/bitcore-lib/blob/master/docs/examples.md#generate-a-random-address)
* [Generate a address from a SHA256 hash](https://github.com/bitpay/bitcore-lib/blob/master/docs/examples.md#generate-a-address-from-a-sha256-hash)
* [Import an address via WIF](https://github.com/bitpay/bitcore-lib/blob/master/docs/examples.md#import-an-address-via-wif)
* [Create a Transaction](https://github.com/bitpay/bitcore-lib/blob/master/docs/examples.md#create-a-transaction)
* [Sign a Bitcoin message](https://github.com/bitpay/bitcore-lib/blob/master/docs/examples.md#sign-a-bitcoin-message)
* [Verify a Bitcoin message](https://github.com/bitpay/bitcore-lib/blob/master/docs/examples.md#verify-a-bitcoin-message)
* [Create an OP RETURN transaction](https://github.com/bitpay/bitcore-lib/blob/master/docs/examples.md#create-an-op-return-transaction)
* [Create a 2-of-3 multisig P2SH address](https://github.com/bitpay/bitcore-lib/blob/master/docs/examples.md#create-a-2-of-3-multisig-p2sh-address)
* [Spend from a 2-of-2 multisig P2SH address](https://github.com/bitpay/bitcore-lib/blob/master/docs/examples.md#spend-from-a-2-of-2-multisig-p2sh-address)


## Security

We're using Bitcore in production, as are [many others](http://bitcore.io#projects), but please use common sense when doing anything related to finances! We take no responsibility for your implementation decisions.

If you find a security issue, please email security@bitpay.com.

## Contributing

Please send pull requests for bug fixes, code optimization, and ideas for improvement. For more information on how to contribute, please refer to our [CONTRIBUTING](https://github.com/bitpay/bitcore-lib/blob/master/CONTRIBUTING.md) file.

## Building the Browser Bundle

To build a altcore-lib full bundle for the browser:

```sh
gulp browser
```

This will generate files named `altcore-lib.js` and `altcore-lib.min.js`.


## Development & Tests

```sh
git clone https://github.com/priestc/altcore-lib
cd bitcore-lib
npm install
```

Run all the tests:

```sh
gulp test
```

You can also run just the Node.js tests with `gulp test:node`, just the browser tests with `gulp test:browser`
or create a test coverage report (you can open `coverage/lcov-report/index.html` to visualize it) with `gulp coverage`.

## License

Code released under [the MIT license](https://github.com/bitpay/bitcore-lib/blob/master/LICENSE).
