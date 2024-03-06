import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

function StoreCard({ storeObj }) {
  return (
    <Card className="store-card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Header>{storeObj.name}</Card.Header>
      <Card.Title>{storeObj.city}</Card.Title>
      <Card.Body>
        <h2>{storeObj.address}</h2>
        <h3>{storeObj.type}</h3>
      </Card.Body>
    </Card>
  );
}

StoreCard.propTypes = {
  storeObj: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

export default StoreCard;
