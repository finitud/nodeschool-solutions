var Hapi = require('hapi'),
    Joi = require('joi');

var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

var routeConfig = {
  path: '/chickens/{breed}',
  method: 'GET',
  handler: function() {},
  config: {
    validate: { params: { breed: Joi.string().required() } }
  }
};

server.route(routeConfig);

server.start(function () {
  console.log('Server running at:', server.info.uri);
});
