# backbone-grid [![Build Status](https://travis-ci.org/jamesrr39/backbone-grid.svg?branch=master)](https://travis-ci.org/jamesrr39/backbone-grid)
Minimal Javascript grid using a backbone collection as its data source.
Playing around with using grunt/requirejs for testing.

## Requirements

* [npm](https://docs.npmjs.com/getting-started/installing-node)
* grunt `npm install -g grunt-cli`

## Usage

Use it like a normal backbone view; pass it an element, a collection, and pass an array of columns. See the [examples](./examples) for getting started.

## Build (pull in 3rd party resources via bower, run tests)

    grunt install

## Test ##

    grunt test

## jshint ##

    grunt jshint

## Package in a minified file with requirejs

    grunt package

## Try out examples at `http://localhost:8080/examples`

    # install http-server package
    npm install http-server
    # start http-server
    node_modules/http-server/bin/http-server ./
