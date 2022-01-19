'use strict';
const Hapi = require('@hapi/hapi');
const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost'
  });

  const config = {
    cors: {
      origin: ['*'],
      additionalHeaders: ['cache-control', 'x-requested-with']
    }
  };

  server.route({
    config,
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Hello World!';
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();