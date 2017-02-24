#! /usr/bin/env node

const ffmpeg = require('fluent-ffmpeg');

const infile = process.argv[2];
const output = process.argv[3];
const overlay = `${__dirname}/overlay.png`;
const usage = `
  Usage
    $ spectacles path/to/source.mp4 path/to/output.mp4
`;

if (!infile) {
  console.log(usage);
  process.exit();
} else if (!output) {
  console.log('Please specify an output file.');
  process.exit();
}

ffmpeg(infile)
  .input(overlay)
  .outputOptions(['-map 0:a'])
  .applyAutoPadding(true)
  .complexFilter(
    [
      'scale=-2:720[rescaled]',
      {
        filter: 'overlay',
        options: {
          x: '(main_w-overlay_w)/2',
          y: '(main_h-overlay_h)/2',
        },
        inputs: ['rescaled'],
        outputs: 'output',
      },
    ],
    'output'
  )
  .output(output)
  .on('error', error => console.log('Error: ' + error.message))
  .on('end', () => console.log('Success!'))
  .run();
