#!/usr/bin/env node --no-warnings
import browserSync from 'browser-sync';
import express from 'express';
import expressStaticGzip from 'express-static-gzip';
import path from 'path';

let [processBuild, processPort] = process.argv.slice(2);

const build = processBuild?.split('=')[1] ?? 'dist';
const port = processPort?.split('=')[1] ?? 1235;

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
  port: +port,
  proxy: serverPath,
  reloadOnRestart: true,
  watch: true,
});

browserSync.watch(buildPath, {}, event => {
  if (event === 'add') browserSync.reload();
});
