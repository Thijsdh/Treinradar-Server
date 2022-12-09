import Hapi from '@hapi/hapi';

import { getVehicles } from '../external-apis/ns/virtual-train-api';

const route: Hapi.ServerRoute = {
  method: 'GET',
  path: '/vehicles',
  handler: async (request, h) => {
    const vehicles = await getVehicles();

    return {
      vehicles,
    };
  },
};

export default route;
