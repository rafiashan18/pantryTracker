import 'bootstrap/dist/css/bootstrap.min.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import React from 'react';
import { CSidebar, CSidebarNav, CSidebarHeader, CNavTitle, CNavItem } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cibAddthis, cilList, cilSearch, cilAccountLogout } from '@coreui/icons';
import { useUserAuth } from './UserAuthContext';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css'; // We'll create this CSS file

const Sidebar = ({ onNavItemClick, isOpen, toggleSidebar }) => {
  const {user, logOut } = useUserAuth();
  const username = user.email.split('@')[0];
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/welcome'); 
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <CSidebar className={`border-end bg-light sidebar py-2 py-md-4 ${isOpen ? 'show' : ''}`}>
      <CSidebarHeader className="border-bottom">
        <button className="btn btn-link d-md-none ml-auto" onClick={toggleSidebar}>
          <span>&times;</span>
        </button>
        {username}
      </CSidebarHeader>
      <CSidebarNav className='d-flex flex-column gap-3'>
        <CNavTitle className='nav-title'>Menu</CNavTitle>
        <CNavItem className='nav-item' href="#" onClick={() => { onNavItemClick('list'); toggleSidebar(); }}>
          <CIcon customClassName="nav-icon" icon={cilList} /> View All Items
        </CNavItem>
        <CNavItem   className='nav-item'  href="#" onClick={() => { onNavItemClick('add'); toggleSidebar(); }}>
          <CIcon customClassName="nav-icon" icon={cibAddthis} /> Add Item
        </CNavItem>
        <CNavItem   className='nav-item'  href="#" onClick={() => { onNavItemClick('delete'); toggleSidebar(); }}>
          <CIcon customClassName="nav-icon" icon={cilSearch} /> Search an Item
        </CNavItem>
        <CNavItem   className='nav-item'  href="#" onClick={() => { handleLogout(); toggleSidebar(); }}>
          <CIcon customClassName="nav-icon" icon={cilAccountLogout} /> Logout
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  );
};

export default Sidebar;