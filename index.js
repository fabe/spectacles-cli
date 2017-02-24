#! /usr/bin/env node

var ffmpeg = require('fluent-ffmpeg');

if (!process.argv[2]) {
  console.log('Please specify a video source.');
  return false;
}

var infile = process.argv[2];
var output = process.argv[3];
var overlay = `${__dirname}/overlay.png`;

ffmpeg(infile).input(overlay).outputOptions(['-map 0:a']).applyAutoPadding(true).complexFilter(['scale=-2:720[rescaled]', {
  filter: 'overlay',
  options: {
    x: '(main_w-overlay_w)/2',
    y: '(main_h-overlay_h)/2'
  },
  inputs: ['rescaled'],
  outputs: 'output'
}], 'output').output(output).on('error', function(error) {
  console.log('Error: ' + error.message);
}).on('end', function() {
  console.log('Success!');
}).run();
