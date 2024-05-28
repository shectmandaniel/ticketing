import axios from 'axios';

const BASE_SERVER_URL =
  'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local';

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    // we are on the server
    return axios.create({
      baseURL: BASE_SERVER_URL,
      headers: req.headers,
    });
  }

  // we are on the client
  return axios.create({
    baseURL: '/',
  });
};

export default buildClient;
