import axios from 'axios';

export const npmSearchInstance = axios.create({
  baseURL: 'https://api.npms.io/v2/search/',
});

export const npmSearch = async (path: string) =>
  (await npmSearchInstance.get(path)).data;
