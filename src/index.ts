#!/usr/bin/env node --no-warnings
import browserSync from 'browser-sync';
import express from 'express';
import expressStaticGzip from 'express-static-gzip';
import path from 'path';

enum Params {
  BUILD = '--build',
  PORT = '--port',
}

const paramMap: Record<Params, string> = Object.assign({}, {
    [Params.BUILD]: 'dist',
    [Params.PORT]: '1000',
  },
  process.argv.slice(2).reduce((obj, param) => {
    const [key, value] = param.split('=');
    if (Object.values(Params).includes(key as Params)) obj[key] = value;
    return obj;
  }, {}),
);

const {
  [Params.BUILD]: build,
  [Params.PORT]: port,
} = paramMap;

const cwd = path.resolve();
const buildPath = `${cwd}/${build}`;
const serverPath = `http://localhost:${port! + 1}`;

const app = express();
app.use('/', expressStaticGzip(`${build}`, {
  enableBrotli: true,
}));
app.listen(port! + 1, () => console.log(`\nbuild: http://localhost:${port}/index.html`));

browserSync.init({
  browser: 'google chrome',
  logLevel: 'silent',
  notify: false,
  open: true,
  port: +port!,
  proxy: serverPath,
  reloadOnRestart: true,
  watch: true,
});

browserSync.watch(buildPath, {}, event => {
  if (event === 'add') browserSync.reload();
});
