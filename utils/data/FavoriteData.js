import { clientCredentials } from '../client';

const getFavoriteItem = async (uid) => {
  try {
    const response = await fetch(`${clientCredentials.databaseURL}/itemfavorites?uid=${uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch favorite items');
    }
    const items = await response.json();
    return Object.values(items);
  } catch (error) {
    console.error('Error fetching favorite items:', error);
    throw error; // Propagate the error to the caller
  }
};

const createFavoriteItem = async (itemId, uid) => {
  const response = await fetch(`${clientCredentials.databaseURL}/itemfavorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uid, // User's Firebase UID
      itemId, // The ID of the item to be favorited
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to create favorite item');
  }
  return response.json();
};
const deleteFavoriteItem = async (favoriteId) => {
  const response = await fetch(`${clientCredentials.databaseURL}/itemfavorites/${favoriteId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to delete favorite item: ${response.statusText}`);
  }
  // Assuming no content is returned for a DELETE operation
};

const getFavoriteUserItems = async (uid) => {
  try {
    const response = await fetch(`${clientCredentials.databaseURL}/itemfavorites/user-favorites?uid=${uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch favorite items');
    }
    const items = await response.json();
    return Object.values(items); // Adjust this line if needed based on your actual response structure
  } catch (error) {
    console.error('Error fetching favorite items:', error);
    throw error;
  }
};
// const getFavoriteItemIds = async () => {
//   try {
//     const token = getUserAuthToken();
//     const response = await fetch(`${clientCredentials.databaseURL}/itemfavorites`, {
//       headers: {
//         Authorization: `Token ${token}`,
//       },
//     });
//     if (!response.ok) {
//       throw new Error('Failed to fetch favorited items');
//     }
//     const favoritedITems = await response.json();
//     return favoritedITems.map((favorite) => favorite.item_id);
//   } catch (error) {
//     console.error('error fetching favorited item IDs:', error);
//     return [];
//   }
// };
export {
  getFavoriteItem,
  createFavoriteItem,
  deleteFavoriteItem,
  getFavoriteUserItems,
};
