var Hapi = require('hapi'),
    H2o2 = require('h2o2');

var server = new Hapi.Server();

server.register(H2o2, function (err) {
  if (err) throw err;
});

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.route({
  path: '/proxy',
  method: 'GET',
  handler: { proxy: { host: '127.0.0.1', port: '65535' } }
});

server.start(function () {
  console.log('Server running at:', server.info.uri);
});
