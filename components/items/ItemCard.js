/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import { useRouter } from 'next/router';
import { createFavoriteItem, deleteFavoriteItem } from '../../utils/data/FavoriteData';
import { useAuth } from '../../utils/context/authContext';

function ItemCard({ itemObj, isFavorite, onUpdate }) {
  const { user } = useAuth();
  const router = useRouter();

  const itemClick = () => {
    if (itemObj.id) {
      router.push(`/items/${itemObj.id}`);
    }
  };

  const handleFavorite = () => {
    if (!isFavorite) {
      createFavoriteItem(itemObj.id, user.uid).then(() => onUpdate());
    } else {
      deleteFavoriteItem(itemObj.id, user.uid).then(() => onUpdate());
    }
  };

  return (
    <Card className="item-card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={itemObj.image} alt={itemObj.name} onClick={itemClick} style={{ height: '300px' }} />
      <div className="heart-btn" onClick={handleFavorite}>
        {isFavorite ? (
          <HeartFill variant="button" fill="red" className="unfav" />
        ) : (
          <Heart variant="button" className="fav" />
        )}
      </div>
    </Card>
  );
}

ItemCard.propTypes = {
  itemObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  // isFavorite: PropTypes.bool,
  onUpdate: PropTypes.func.isRequired,
};

export default ItemCard;
