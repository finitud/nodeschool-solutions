var Hapi = require('hapi'),
    Path = require('path'),
    fs = require('fs'),
    rot13 = require('rot13-transform');

var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.route({
  path: '/',
  method: 'GET',
  handler: function(req, res) {
    res(fs.createReadStream(Path.join(__dirname, 'rot13.txt')).pipe(rot13()));
  }
});

server.start(function () {
  console.log('Server running at:', server.info.uri);
});
