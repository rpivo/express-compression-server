#!/usr/bin/env node
import express from 'express';
import expressStaticGzip from 'express-static-gzip';
import yargs from 'yargs';
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
const app = express();
const port = 1235;
app.use('/', expressStaticGzip(`${build}`, {
    enableBrotli: true,
}));
app.listen(port, () => console.log(`\n\nbuild: http://localhost:${port}/index.html`));
