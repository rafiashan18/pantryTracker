import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useUserAuth } from './UserAuthContext';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signUp(email, password);
      navigate('/Login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="wrapper-container">
      <div className='  d-flex  flex-column justify-content-center align-items-center h-100'>
    

        <div className="form-wrapper ">
        <h3>Sign up </h3>
          <Form onSubmit={handleSubmit}>
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
            <Button variant="primary" className='ms-auto' type="submit">
              Sign Up
            </Button>
            <p className='py-2'>
              Already have an account? <Link to="/Login">Log In</Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
