#!/usr/bin/env node

const fs = require('fs');
const readChunk = require('read-chunk');
const imageType = require('image-type');
const execFile = require('child_process').execFile;
const cwebp = require('cwebp-bin');
const program = require('commander');

program
  .version('0.0.3')
  .option('-r, --recursive', 'Walk given directory recursively')
  .option('-f, --files <items>', 'Files to convert, split by \',\'', v => v.split(','))
  .option('-q, --quality <float>', 'Specify the compression factor for RGB channels between 0 and 100', 75)
  .option('-m, --method <int>', 'Specify the compression method to use. This parameter controls the trade off between encoding speed and the compressed file size and quality. Possible values range from 0 to 6 (default: 4)')
  .parse(process.argv);

let files = [];

const getExt = (fileName) => /\.[^\.]+$/.exec(fileName); 
const getOption = (key, param) => param ? [key, param] : [];


const walk = (path) => {
  const getItemPath = item => `${path}/${item}`;
  const dirs = fs.readdirSync(path);

  dirs.forEach((item) => {
    if (fs.statSync(getItemPath(item)).isFile()) {
      const imageTypeData = imageType(readChunk.sync(getItemPath(item), 0, 12));
      if (imageTypeData) {
        if (imageTypeData.ext === 'jpg' || imageTypeData.ext === 'png') {
          files.push(getItemPath(item));
        }
      }
    }
  });

  if (program.recursive) {
    dirs.forEach((item) => {
      if (fs.statSync(getItemPath(item)).isDirectory()) {
        walk(getItemPath(item));
      }
    });
  }
};

if (program.files) files = program.files;
else walk(process.cwd());

console.log(`Found ${files.length} images`);

const options = [
  ...getOption('-q', program.quality),
  ...getOption('-m', program.method),
];

files.forEach((file) => {
  execFile(cwebp, [...options, file, '-o', file.replace(getExt(file),".webp")], (err) => {
    if (err) throw err;
    console.log(`${file} converted!`);
  });
});
