#!/usr/bin/env node --no-warnings
import browserSync from 'browser-sync';
import express from 'express';
import expressStaticGzip from 'express-static-gzip';
import yargs from 'yargs';

type Options = {
  build: string;
  port?: number;
};

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
  .argv as unknown as Options;

const { build, port = 1235 } = options;

const serverPath = `http://localhost:${port + 1}`;

const app = express();
app.use('/', expressStaticGzip(`${build}`, {
  enableBrotli: true,
}));
app.listen(port + 1, () => console.log(`\n\nbuild: http://localhost:${port}/index.html`));

browserSync.init({
  browser: 'google chrome',
  logLevel: 'silent',
  notify: false,
  open: true,
  port,
  proxy: serverPath,
  reloadOnRestart: true,
});
