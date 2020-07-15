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
    .option('p', {
    alias: 'port',
    describe: 'port to be used for server',
    type: 'number',
})
    .argv;
const { build, port } = options;
const app = express();
app.use('/', expressStaticGzip(`${build}`, {
    enableBrotli: true,
}));
app.listen(port, () => console.log(`\n\nbuild: http://localhost:${port || 1235}/index.html`));
