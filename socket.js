const config = require('config');
const socketPort = config.get('socketPort') || 5001
const io = require('socket.io').listen(socketPort);
const ss = require('socket.io-stream');

var path = require('path');
var fs = require('fs');

io.on('connection', function (socket) {
  console.log(`socket in laucnhed. Port: ${socketPort}`)
  ss(socket).on('img-about-upload', function (stream, data) {
    /////////////////////////isDev ?

    const pathForImages = path.resolve(__dirname, 'client/public/images/about');
    // fs.readdir(pathForImages, (err, items) => {
    //   console.log(items)
    // });

    const filename = path.basename(data.name);
    stream.pipe(fs.createWriteStream(pathForImages + '/'+filename));
  });
});
