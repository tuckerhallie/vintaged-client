/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Button } from 'react-bootstrap';
import { getAllItems } from '../../utils/data/ItemData';
import { getFavoriteUserItems } from '../../utils/data/FavoriteData';
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
      getFavoriteUserItems(user.uid).then((favs) => {
        setFavoriteItems(favs);
      }).catch((error) => console.error('error fetching favorite items:', error));
    }
  };

  useEffect(() => {
    getAllTheItems();
    getFavoriteItemsForUser();
  }, [user]);

  const onUpdate = () => {
    getAllTheItems();
    getFavoriteItemsForUser();
  };

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
              isFavorite={favoriteItems.some((thing) => thing.item.id === item.id)} // Pass isFavorite status as prop
              onUpdate={onUpdate} // Placeholder onUpdate function
            />
          ))}
        </div>
      </div>
    </>
  );
}
