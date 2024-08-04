import React from 'react';
import Card from 'react-bootstrap/Card';

function ItemCards({ items, onDeleteItem, onUpdateItem }) {
  const handleDelete = (id) => {
    onDeleteItem(id);
  };

  const handleUpdate = (item) => {
    if (typeof onUpdateItem === 'function') {
      onUpdateItem(item);
    } else {
      console.error('onUpdateItem is not a function:', onUpdateItem);
    }
  };

  const formatDate = (date) => {
    if (!(date instanceof Date)) return 'No date';
    return date.toLocaleDateString();
  };

  if (items.length === 0) {
    return <p>No items found.</p>;
  }

  return (
    <div className="item-cards d-flex flex-wrap">
      {items.map((item) => (
        <Card key={item.id} style={{ width: '18rem', margin: '1rem' }}>
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>
              Quantity: {item.quantity} {item.unit}
            </Card.Text>
            <Card.Text>
              Category: {item.category}
            </Card.Text>
            <Card.Text>
              Expiry Date: {formatDate(item.expiryDate)}
            </Card.Text>
            <button onClick={() => handleUpdate(item)} className='mx-2 rounded-2 '  style={{backgroundColor:' transparent', border:'2px solid rgb(255, 124, 16)' ,color:'rgb(255, 124, 16)'}} >Update</button>
            <button onClick={() => handleDelete(item.id)} className='mx-2 rounded-2 '  style={{backgroundColor:' #000', border:'none' }} >Delete</button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default ItemCards;