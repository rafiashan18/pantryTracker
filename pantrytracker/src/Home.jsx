import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from './UserAuthContext';
import { getItems, deleteItem } from './firestore';
import NavbarComp from './navbar';
import Sidebar from './sidebar';
import AddItemForm from './addform2';
import ItemCards from './itemlist';
import SearchAndFilter from './searchItem';
import Alert from 'react-bootstrap/Alert';
import { Button } from 'react-bootstrap';

const Home = () => {
  const { user } = useUserAuth();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [view, setView] = useState('add');
  const [showAlert, setShowAlert] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, [user]);

  const fetchItems = async () => {
    if (user) {
      const fetchedItems = await getItems(user.uid);
      setItems(fetchedItems);
      setFilteredItems(fetchedItems);
    }
  };

  const handleItemAdded = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
    fetchItems();
  };

  const handleDeleteItem = async (id) => {
    await deleteItem(id);
    fetchItems();
  };

  const handleUpdateItem = useCallback((item) => {
    navigate('/update', { state: { item } });
  }, [navigate]);

  const categories = useMemo(() => {
    return [...new Set(items.map(item => item.category))];
  }, [items]);

  const handleSearch = ({ searchTerm, category, nearingExpiry }) => {
    let filtered = items;

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter(item => item.category === category);
    }

    if (nearingExpiry) {
      const oneWeekFromNow = new Date();
      oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
      filtered = filtered.filter(item => 
        item.expiryDate && new Date(item.expiryDate) <= oneWeekFromNow
      );
    }

    setFilteredItems(filtered);
  };

  const handleNavItemClick = (view) => {
    setView(view);
    setShowSearch(view === 'delete');
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <NavbarComp />
      <div className='d-flex'>
        <Sidebar 
          onNavItemClick={handleNavItemClick} 
          isOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <div className="container">
          <Button 
            className="d-md-none position-fixed top-0 end-0 mt-2 me-2" 
            onClick={toggleSidebar}
          >
            Menu
          </Button>
          {showAlert && (
            <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
              Item added!
              <Alert.Link href="#" onClick={() => setView('list')}>View Items</Alert.Link>
            </Alert>
          )}
          
          {view === 'add' && <AddItemForm onItemAdded={handleItemAdded} />}
          {(view === 'list' || view === 'delete') && (
            <>
              {showSearch && <SearchAndFilter onSearch={handleSearch} categories={categories} />}
              {filteredItems.length > 0 ? (
                <ItemCards 
                  items={filteredItems} 
                  onDeleteItem={handleDeleteItem} 
                  onUpdateItem={handleUpdateItem} 
                />
              ) : (
                <p>No items found.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;