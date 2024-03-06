import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleItem } from '../../../utils/data/ItemData';
import ItemForm from '../../../components/items/ItemForm';

export default function EditItem() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleItem(id).then(setEditItem);
  }, [id]);

  return (<ItemForm obj={editItem} />);
}
