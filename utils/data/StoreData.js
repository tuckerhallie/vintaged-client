import { clientCredentials } from '../client';

const getAllStores = async () => {
  const response = await fetch(`${clientCredentials.databaseURL}/stores`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const stores = await response.json();
  return Object.values(stores);
};

const getSingleStore = async (id) => {
  const response = await fetch(`${clientCredentials.databaseURL}/stores/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const store = await response.json();
  return store;
};

export {
  getAllStores,
  getSingleStore,
};
