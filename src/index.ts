#!/usr/bin/env node --no-warnings
import browserSync from 'browser-sync';
import express from 'express';
import expressStaticGzip from 'express-static-gzip';
import path from 'path';
import yargs from 'yargs';

type Options = {
  build: string;
  port?: number;
};

const options = yargs
  .usage('Usage: -b <build> -p <port>')
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

const cwd = path.resolve();
const buildPath = `${cwd}/${build}`;
const serverPath = `http://localhost:${port + 1}`;

const app = express();
app.use('/', expressStaticGzip(`${build}`, {
  enableBrotli: true,
}));
app.listen(port + 1, () => console.log(`\nbuild: http://localhost:${port}/index.html`));

browserSync.init({
  browser: 'google chrome',
  logLevel: 'silent',
  notify: false,
  open: true,
  port,
  proxy: serverPath,
  reloadOnRestart: true,
  watch: true,
});

browserSync.watch(buildPath, {}, event => {
  if (event === 'add') browserSync.reload();
});
