import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useUserAuth } from './UserAuthContext';
import { useNavigate, Link } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { logIn, googleSignIn } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await logIn(email, password);
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
   <div className="wrapper">
     <div className='  d-flex justify-content-center align-items-center h-100'>
      <div className='form-wrapper '>
        <Form onSubmit={handleSubmit} className='d-flex flex-column justify-content-start align-items-center'>
            <h3>Login</h3>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          {error && <p>{error}</p>}
          <Button variant="primary" type="submit" className='my-2'>
            Log In
          </Button>
          <GoogleButton className="g-btn" type="dark" onClick={handleGoogleSignIn} />
          <p className='py-2'>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </Form>
      </div>
    </div>
   </div>
  );
};

export default Login;
