var FFmpeg = require('fluent-ffmpeg');
if (!process.argv[2]) {
  console.log('Please specify a video source.');
  return false;
}
var infile = process.argv[2];
var outfile = './processed.mp4';
var wmimage = './overlay.png';
var ffmpeg = require('fluent-ffmpeg');

ffmpeg(infile).input(wmimage).outputOptions(['-map 0:a']).applyAutoPadding(true).complexFilter(["scale=720:720[rescaled]", {
  filter: "overlay",
  options: {
    x: "0",
    y: "0"
  },
  inputs: ["rescaled"],
  outputs: "output"
}], 'output').output("output.mp4").on("error", function(er) {
  console.log("error occured: " + er.message);
}).on("end", function() {
  console.log("success");
}).run();
