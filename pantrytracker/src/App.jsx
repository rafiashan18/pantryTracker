import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserAuthContextProvider } from './UserAuthContext';
import SignUp from './SignUp';
import Login from './Login';
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';
import WelcomePage from './WelcomePage.jsx';
import UpdateItem from './updateForm.jsx'; // Import the UpdateItem component

function App() {
  return (
    <>
      <UserAuthContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update"
              element={
                <ProtectedRoute>
                  <UpdateItem />
                </ProtectedRoute>
              }
            />
             <Route path="/welcome" element={<WelcomePage />} />
          </Routes>
        </Router>
      </UserAuthContextProvider>
    </>
  );
}

export default App;
