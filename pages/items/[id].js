/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Head from 'next/head';
import { getSingleItem, deleteItem } from '../../utils/data/ItemData';
import { useAuth } from '../../utils/context/authContext';

export default function ViewItem() {
  const [itemDetails, setItemDetails] = useState([]);
  const router = useRouter();

  const { id } = router.query;

  const { user } = useAuth();

  const isCurrentUserCreator = user?.uid === itemDetails?.user?.uid; // Adjusted based on assumed structure

  const deleteThisItem = () => {
    deleteItem(itemDetails.id).then(() => (router.push('/items')));
  };

  useEffect(() => {
    getSingleItem(id).then(setItemDetails);
  }, [id]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <Head>
        <title>Item Details</title>
      </Head>
      <div className="d-flex flex-column">
        <img src={itemDetails.image} alt={itemDetails.name} style={{ width: '300px' }} />
      </div>
      <div id="itemCardDetails">
        <h1>
          {itemDetails.name}
        </h1>
        <h6>{itemDetails.color}</h6>
        <h5>{itemDetails.store?.name}</h5>
        <h6>{itemDetails.type}</h6>
        {isCurrentUserCreator && (
          <Link href={`/items/edit/${itemDetails.id}`} passHref>
            <Button variant="primary" className="edit">EDIT</Button>
          </Link>
        )}

        {isCurrentUserCreator && (
          <Button variant="danger" onClick={deleteThisItem} className="mb-2"> Delete </Button>
        )}
      </div>
    </div>
  );
}
