var Hapi = require('hapi'),
    Joi = require('joi');

var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

var routeConfig = {
  path: '/login',
  method: 'POST',
  handler: function(req, reply) { reply('login successful'); },
  config: {
    validate: {
      payload: Joi.object({
        isGuest: Joi.boolean().required(),
        username: Joi.string().when('isGuest', { is: false, then: Joi.required() }),
        password: Joi.string().alphanum(),
        accessToken: Joi.string().alphanum()
      })
        .options({allowUnknown: true})
        .without('password', 'accessToken')
    }
  }
};

server.route(routeConfig);

server.start(function () {
  console.log('Server running at:', server.info.uri);
});
