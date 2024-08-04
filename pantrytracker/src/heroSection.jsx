import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import './shapeDivider.css'

function HeroSection() {
  return (
    <>
    <Navbar collapseOnSelect expand="lg" className="bg-body-transparent nav">
    <Container className="d-flex justify-content-around gap-3">
      <Navbar.Brand href="#home" style={{  }} className="fw-bold text-light fs-3 ps-2 ps-md-4 ms-1" >Pantry Tracker</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto px-md-2 px-3 gap-3">
          <Link to="/SignUp">  <button className="btn btn-outline-light fw-bold "  > Sign Up</button></Link>
          <Link to="/Login">  <button  className="btn btn-light fw-bold "> Login</button></Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
    <div className="wave-container">

    <Carousel style={{width:'100vw'}}
    
    controls={false}    // Disable carousel controls
    indicators={false}  // Disable indicators (dots)
    interval={null}     // Disable automatic sliding
    >

      <Carousel.Item>
      <div className="orange-overlay">
      <img
          className="d-block w-100" style={{height:'90vh', width:'100vw', objectFit:'cover',objectPosition: 'bottom'}}
          src="https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="First slide"
        />
        </div>
        <Carousel.Caption className='custom-caption'>
          <h3>Your Pantry Tracker</h3>
          <p>The pantry tracker that's got your back (and your snacks): Stay on top of your kitchen game with Pantry Tracker, the ultimate kitchen companion</p>
        </Carousel.Caption>
      </Carousel.Item>
      
      {/* <Carousel.Item>
     <div className="orange-overlay">
     <img
          className="d-block w-100" style={{height:'90vh', objectFit:'cover'}}
          src="https://images.unsplash.com/photo-1567767326925-e2047bf469d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Second slide"
        />
     </div>
     <Carousel.Caption className='custom-caption'>
          <h3>Your Pantry Tracker</h3>
          <p>Stock up on savings, not stress: Pantry Tracker helps you stay on top of your kitchen essentials, so you can focus on what matters most</p>
        </Carousel.Caption>
     
      </Carousel.Item> */}
 
    </Carousel>
    </div>
    <div className="btn-div">
   <Link to ='/Login'> <button  className="btn  fw-bold btn-start px-3 px-md-4 "> Start Now</button> </Link>   </div>
    </>
  );
}

export default HeroSection;