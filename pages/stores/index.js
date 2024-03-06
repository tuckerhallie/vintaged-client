import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { getAllStores } from '../../utils/data/StoreData';
import StoreCard from '../../components/stores/StoreCard';

export default function StorePage() {
  const [stores, setStores] = useState([]);

  const getAllTheStores = () => {
    getAllStores().then(setStores);
  };

  useEffect(() => {
    getAllTheStores();
  }, []);

  return (
    <>
      <Head>
        <title>Stores</title>
      </Head>
      <div className="text-center my-4">
        <div
          id="storeCards"
          className="d-flex flex-wrap"
        >
          {stores.map((store) => (
            <StoreCard key={store.id} storeObj={store} onUpdate={getAllTheStores} />
          ))}
        </div>
      </div>
    </>
  );
}
