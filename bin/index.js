#!/usr/bin/env node
"use strict";
var express = require('express');
var expressStaticGzip = require('express-static-gzip');
var yargs = require('yargs');
var options = yargs
    .usage('Usage: -b <build>')
    .option('b', {
    alias: 'build',
    describe: 'location of build to be served',
    type: 'string',
    demandOption: true,
})
    .argv;
var build = options.build;
console.log(build);
// const app = express();
// const port = 3000; // add dynamic import to yargs
// app.use('/', expressStaticGzip('/', {
//   enableBrotli: true,
// }));
