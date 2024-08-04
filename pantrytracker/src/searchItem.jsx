import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

function SearchAndFilter({ onSearch, categories }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showNearingExpiry, setShowNearingExpiry] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch({ searchTerm: value, category: selectedCategory, nearingExpiry: showNearingExpiry });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onSearch({ searchTerm, category: value, nearingExpiry: showNearingExpiry });
  };

  const handleNearingExpiryToggle = () => {
    setShowNearingExpiry(!showNearingExpiry);
    onSearch({ searchTerm, category: selectedCategory, nearingExpiry: !showNearingExpiry });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  };
  return (
    <Form className="mb-3" onSubmit={handleSubmit}>
      <Row className="align-items-end">
        <Col md={4}>
          <Form.Group controlId="searchTerm">
            <Form.Label>Search Items</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="categoryFilter">
            <Form.Label>Filter by Category</Form.Label>
            <Form.Select
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="nearingExpiryFilter">
            <Form.Check
              type="checkbox"
              label="Show items nearing expiry"
              checked={showNearingExpiry}
              onChange={handleNearingExpiryToggle}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Button variant="secondary" onClick={() => {
            setSearchTerm('');
            setSelectedCategory('');
            setShowNearingExpiry(false);
            onSearch({ searchTerm: '', category: '', nearingExpiry: false });
          }}>
            Clear Filters
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchAndFilter;