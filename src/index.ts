import { config } from 'dotenv';
config();

import Hapi from '@hapi/hapi';

import vehicles from './routes/vehicles';

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
  });

  server.route(vehicles);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();
