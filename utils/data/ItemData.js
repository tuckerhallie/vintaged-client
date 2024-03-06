import { clientCredentials } from '../client';

const getAllItems = async () => {
  const response = await fetch(`${clientCredentials.databaseURL}/items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const items = await response.json();
  return Object.values(items);
};

const getSingleItem = async (id) => {
  const response = await fetch(`${clientCredentials.databaseURL}/items/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const item = await response.json();
  return item;
};

const createItem = async (payload) => {
  const response = await fetch(`${clientCredentials.databaseURL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const newItem = await response.json();
  return newItem;
};

const updateItem = (payload, uid) => new Promise((resolve, reject) => {
  const updatedPayload = {
    ...payload,
    user: payload.user || uid,
  };

  fetch(`${clientCredentials.databaseURL}/items/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
    body: JSON.stringify(updatedPayload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (response.status === 200 || response.headers.get('content-length') === '0') {
        return null;
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteItem = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/items/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network Response Error');
      }
      resolve();
    })
    .catch(reject);
});

const getItemStores = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/stores`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getAllItems,
  getSingleItem,
  createItem,
  updateItem,
  deleteItem,
  getItemStores,
};
