import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const Navigation = () => {
    return (
        <Navbar bg="dark" variant="dark" className="mb-2">
            <Navbar.Brand href="#home" style={{ marginLeft: '4rem', marginRight: '5rem' }}>PicPred</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/list">Images</Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default Navigation;