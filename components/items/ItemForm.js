import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { createItem, updateItem, getItemStores } from '../../utils/data/ItemData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  name: '',
  type: '',
  color: '',
  image: '',
  store: '',

};

function ItemForm({ obj }) {
  const [currentItem, setCurrentItem] = useState(initialState);
  const [itemStore, setItemStore] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getItemStores().then((stores) => {
      setItemStore(stores);
    });
    if (obj && obj.id) {
      setCurrentItem((prevState) => ({
        ...prevState,
        id: obj.id,
        name: obj.name,
        type: obj.type,
        color: obj.color,
        image: obj.image,
        user: user.uid,
        store: obj.store?.id,

      }));
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCurrentItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      const itemUpdate = {
        id: obj.id,
        name: currentItem.name,
        type: currentItem.type,
        color: currentItem.color,
        image: currentItem.image,
        store: currentItem.store,
        user: user.uid,
      };
      updateItem(itemUpdate).then(() => router.push('/items'));
    } else {
      const item = {
        name: currentItem.name,
        type: currentItem.type,
        color: currentItem.color,
        image: currentItem.image,
        store: currentItem.store,
        user: user.uid,
      };
      createItem(item).then(() => router.push('/items'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-grey mt-5">{obj.id ? 'Update' : 'Create'} Item </h2>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" required value={currentItem.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label> Type</Form.Label>
          <Form.Control
            name="type"
            required
            value={currentItem.type}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> Color </Form.Label>
          <Form.Control
            name="color"
            required
            value={currentItem.color}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label> Add An Image</Form.Label>
          <Form.Control
            name="image"
            type="url"
            placeholder="image url"
            value={currentItem.image}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label> Store </Form.Label>
          <Form.Select
            name="store"
            required
            value={currentItem.store}
            onChange={handleChange}
          >
            <option value=""> Select Store</option>
            {itemStore.map((store) => (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Share Item
        </Button>
      </Form>

    </>
  );
}

ItemForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string,
    color: PropTypes.string,
    image: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    store: PropTypes.object,
  }),
};

ItemForm.defaultProps = {
  obj: initialState,
};

export default ItemForm;
