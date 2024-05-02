import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://vortex.korabli.su/api',
  /*   withCredentials: true, // required to handle the CSRF token */
});

export default {
  loadShips(payload: any) {
    return apiClient.post('/graphql/glossary/', payload ? payload : null);
  },
};
