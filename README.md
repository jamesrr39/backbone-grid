# backbone-grid [![Build Status](https://travis-ci.org/jamesrr39/backbone-grid.svg?branch=master)](https://travis-ci.org/jamesrr39/backbone-grid)
Minimal Javascript grid using a backbone collection as its data source.
Playing around with using grunt/requirejs for testing.

## Requirements

* [npm](https://docs.npmjs.com/getting-started/installing-node)
* grunt `npm install -g grunt-cli`

## Usage

Use it like a normal backbone view; pass it an element, a collection, and pass an array of columns.
See the [Examples Wiki page](https://github.com/jamesrr39/backbone-grid/wiki/Examples) for examples and getting started.
As it's an extension of a Backbone View, you can also use ```BackboneGridView.extend``` to extend it in a way that works for you.

## Build (pull in 3rd party resources via bower, run tests)

    grunt install

## Test ##

    grunt test

## jshint ##

    grunt jshint

## Package in a minified file with requirejs

    grunt package

## Try out examples at `http://localhost:8080/examples`

    npm run-script demo
