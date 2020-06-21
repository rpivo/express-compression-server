#!/usr/bin/env node
import yargs from 'yargs';
// const express = require('express');
// const expressStaticGzip = require('express-static-gzip');
// const yargs = require('yargs');
const options = yargs
    .usage('Usage: -b <build>')
    .option('b', {
    alias: 'build',
    describe: 'location of build to be served',
    type: 'string',
    demandOption: true,
})
    .argv;
const { build } = options;
console.log(build);
// const app = express();
// const port = 3000; // add dynamic import to yargs
// app.use('/', expressStaticGzip('/', {
//   enableBrotli: true,
// }));
