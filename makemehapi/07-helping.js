var Hapi = require('hapi'),
    Vision = require('vision'),
    Path = require('path');

var server = new Hapi.Server();

server.register(Vision, function (err) {
  if (err) throw err;
});

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.route({
  path: '/',
  method: 'GET',
  handler: { view: 'index.html' }
});

server.views({
  engines: {
    html: require('handlebars')
  },
  path: Path.join(__dirname, '07/templates'),
  helpersPath: Path.join(__dirname, '07/helpers')
});

server.start(function () {
  console.log('Server running at:', server.info.uri);
});
