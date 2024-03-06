/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Button } from 'react-bootstrap';
import { getAllItems } from '../../utils/data/ItemData';
import { getFavoriteUserItems, createFavoriteItem, deleteFavoriteItem } from '../../utils/data/FavoriteData';
import ItemCard from '../../components/items/ItemCard';
import { useAuth } from '../../utils/context/authContext';

export default function ItemPage() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);

  const getAllTheItems = () => {
    getAllItems().then(setItems);
  };

  const getFavoriteItemsForUser = () => {
    if (user) {
      console.warn('User ID:', user.uid);
      getFavoriteUserItems(user.uid).then((favs) => {
        setFavoriteItems(favs);
      }).catch((error) => console.error('error fetching favorite items:', error));
    }
  };

  useEffect(() => {
    getAllTheItems();
    getFavoriteItemsForUser();
  }, [user]);

  const onUpdate = (itemId, isCurrentlyFavorite) => {
    if (isCurrentlyFavorite) {
      console.warn('Item ID type:', typeof itemId);
      console.warn('Sample favorite item ID type:', typeof favoriteItems[0]?.item.id);
      const favorite = favoriteItems.find((fav) => fav.item.id === itemId);
      if (favorite) {
        deleteFavoriteItem(favorite.id, user.uid).then(() => {
          setFavoriteItems((favs) => favs.filter((fav) => fav.item.id !== itemId));
        });
      }
    } else {
      createFavoriteItem(itemId, user.uid).then((newFavorite) => {
        setFavoriteItems((favs) => [...favs, { ...newFavorite, item: { id: itemId } }]);
      });
    }
  };

  // Placeholder function for checking if an item is favorite
  const isItemFavorite = (itemId) => favoriteItems.some((item) => item.id === itemId);

  return (
    <>
      <Head>
        <title>Items</title>
      </Head>
      <Link href="/items/new" passHref>
        <Button variant="outline-dark"> Add An Item </Button>
      </Link>
      <div className="text-center my-4">
        <div id="itemCards" className="d-flex flex-wrap">
          {/* Render each item as an ItemCard component */}
          {items.map((item) => (
            <ItemCard
              key={item.id}
              itemObj={item}
              isFavorite={isItemFavorite(item.id)} // Pass isFavorite status as prop
              onUpdate={(itemId, isFavorite) => onUpdate(itemId, isFavorite)} // Placeholder onUpdate function
            />
          ))}
        </div>
      </div>
    </>
  );
}
