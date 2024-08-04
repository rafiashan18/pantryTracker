import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { updateItem } from './firestore';

function UpdateItem() {
    const location = useLocation();
    const navigate = useNavigate();
    const { item } = location.state;
    const [formData, setFormData] = useState({
      ...item,
      expiryDate: item.expiryDate ? item.expiryDate.toISOString().split('T')[0] : ''
    });
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const updatedItem = {
        ...formData,
        expiryDate: formData.expiryDate ? new Date(formData.expiryDate) : null
      };
      await updateItem(item.id, updatedItem);
      alert('Item has been updated');
      navigate('/home');
    };
  
  return (
    <div className='w-100 d-flex justify-content-center align-items-center'>
      <Form className='w-100 h-100 d-flex flex-column gap-3 pt-3 pt-md-5' style={{ maxWidth: '600px' }} onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
          <Form.Label column sm={2}>
            Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" required placeholder="Enter Item Name" name="name" value={formData.name} onChange={handleChange} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalNumber">
          <Form.Label column sm={2} className=''>
            Quantity
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="number" required min={1} placeholder="Enter quantity" name="quantity" value={formData.quantity} onChange={handleChange} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalUnit">
          <Form.Label column sm={2}>
            Unit
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" required placeholder="Enter Unit" name="unit" value={formData.unit} onChange={handleChange} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalCategory">
          <Form.Label column sm={2}>
            Category
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" required placeholder="Enter Category" name="category" value={formData.category} onChange={handleChange} />
          </Col>
        </Form.Group>


        <Form.Group as={Row} className="mb-3" controlId="formHorizontalExpiryDate">
          <Form.Label column sm={2}>
            Expiry Date
          </Form.Label>
          <Col sm={10}>
            <Form.Control 
              type="date" 
              name="expiryDate" 
              value={formData.expiryDate} 
              onChange={handleChange} 
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" style={{backgroundColor:' rgb(255, 124, 16)', border:'none' }}>Update Item</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default UpdateItem;
