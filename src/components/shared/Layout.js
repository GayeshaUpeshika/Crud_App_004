import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';






function Layout(props){
    return( 
    <>
    
        <Navbar bg="primary" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand >SuperHR</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/all-department">Departments</Nav.Link>
            <Nav.Link href="/all-employee">Employees</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
        
         </Container>
        </Navbar>
        
        <Container>{props.children}</Container>
    </>
    );
}

export default Layout;