import { config } from 'dotenv';
config();

import Hapi from '@hapi/hapi';

import vehicles from './routes/vehicles';

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    debug: false,
  });

  server.route(vehicles(server));

  await server.register({
    plugin: require('hapi-pino'),
    options: {
      transport:
        process.env.NODE_ENV === 'development'
          ? {
              target: 'pino-pretty',
            }
          : undefined,
    },
  });

  await server.start();
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();
