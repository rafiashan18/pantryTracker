
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, Link } from 'react-router-dom';
import { useUserAuth } from './UserAuthContext';


const NavbarComp = () => {
    const { logOut } = useUserAuth();
    let navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        setError('');
        try {
          await logOut(email, password);
          navigate('/WelcomePage');
        } catch (err) {
          setError(err.message);
        }
      };

    return (
<>
<Navbar collapseOnSelect expand="lg" className="bg-body-transparent "  >
        <Container fluid className="d-flex justify-content-start gap-3">
            <Navbar.Brand href="#home" style={{color:'rgb(255, 124, 16)'}} className="fw-bold  fs-3  ms-1"  >Pantry Tracker</Navbar.Brand>
            {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto px-md-2 px-3 gap-3">
                      <button  onClick={handleLogout} className="btn btn-light fw-bold "> Logout</button>
                </Nav>
            </Navbar.Collapse> */}
        </Container>
    </Navbar>
  
</>
    )
}
export default NavbarComp