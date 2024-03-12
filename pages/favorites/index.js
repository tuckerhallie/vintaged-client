/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { getFavoriteUserItems } from '../../utils/data/FavoriteData';
import ItemCard from '../../components/items/ItemCard';
import { useAuth } from '../../utils/context/authContext';

export default function FavoritesPage() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  const getAllFavorites = () => {
    getFavoriteUserItems(user.uid).then(setFavorites);
  };

  useEffect(() => {
    getAllFavorites();
  }, []);

  return (
    <>
      <Head>
        <title>Favorites</title>
      </Head>
      <div className="text-center my-4">
        <div className="d-flex flex-wrap">
          {favorites.map((item) => (
            <ItemCard
              key={item.item.id}
              itemObj={item.item}
              isFavorite
              onUpdate={getAllFavorites}
            />
          ))}
        </div>
      </div>
    </>
  );
}
