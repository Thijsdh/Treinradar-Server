import Hapi from '@hapi/hapi';

import { getVehicles } from '../external-apis/ns/virtual-train-api';

const createVehiclesCache = (server: Hapi.Server) => {
  return server.cache({
    segment: 'vehicles',
    expiresIn: 10 * 1000,
    generateFunc: async () => {
      const vehicles = await getVehicles();
      server.log(
        ['ns-api', 'virtual-train-api'],
        `Fetched ${vehicles.length} vehicles`
      );
      return { vehicles };
    },
    generateTimeout: 5000,
  });
};

const route = (server: Hapi.Server): Hapi.ServerRoute => {
  const vehiclesCache = createVehiclesCache(server);

  return {
    method: 'GET',
    path: '/vehicles',
    handler: async (request, h) => {
      return await vehiclesCache.get({ id: 'vehicles' });
    },
  };
};

export default route;
