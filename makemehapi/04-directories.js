var Hapi = require('hapi'),
    Inert = require('inert'),
    Path = require('path');

var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.register(Inert, function (err) {
  if (err) throw err;
});

server.route({
  path: '/foo/bar/baz/{file}',
  method: 'GET',
  handler: { directory: { path: process.argv[3] || Path.join(__dirname, 'public-04') } }
});

server.start(function () {
  console.log('Server running at:', server.info.uri);
});
