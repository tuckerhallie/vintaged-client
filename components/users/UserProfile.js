/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getAllItems } from '../../utils/data/ItemData';
import ItemCard from '../items/ItemCard';
import { useAuth } from '../../utils/context/authContext';

export default function UserProfile() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllTheItems = () => {
    getAllItems(user.uid).then((itemData) => {
      setItems(itemData);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getAllTheItems();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.first_name}</h1>
      <h1>{user.last_name}</h1>
      <h2>{user.bio}</h2>
      {items.map((item) => (
        <ItemCard key={item.id} itemObj={item} onUpdate={getAllTheItems} />
      ))}
    </div>
  );
}
