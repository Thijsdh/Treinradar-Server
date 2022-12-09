import axios from 'axios';

function getConfig() {
  if (!process.env.NS_API_KEY) {
    throw new Error('NS_API_KEY is not set');
  }

  return {
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.NS_API_KEY,
    },
  };
}

export async function getVehicles() {
  const res = await axios.get(
    'https://gateway.apiportal.ns.nl/virtual-train-api/api/vehicle',
    getConfig()
  );

  return res.data.payload.treinen;
}
