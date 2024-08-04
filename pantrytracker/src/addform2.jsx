import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useUserAuth } from './UserAuthContext';
import { addItem } from './firestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Timestamp } from 'firebase/firestore';

function AddItemForm({ onItemAdded }) {
  const { user } = useUserAuth();
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unit: '',
    category: '',
    expiryDate: new Date(),
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      expiryDate: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      const formDataWithTimestamp = {
        ...formData,
        expiryDate: Timestamp.fromDate(formData.expiryDate),
      };
      await addItem(user.uid, formDataWithTimestamp);
      setFormData({
        name: '',
        quantity: '',
        unit: '',
        category: '',
        expiryDate: new Date(),
      });
      onItemAdded(); // Notify parent component
    }
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
            <DatePicker selected={formData.expiryDate} onChange={handleDateChange} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" style={{ backgroundColor: 'rgb(255, 124, 16)', border: 'none' }}>Add Item</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default AddItemForm;
