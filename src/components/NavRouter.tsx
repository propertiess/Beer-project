import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const NavRouter = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto gap-3 mt-1 text-center">
                        <NavLink to={'/'} className={'text-decoration-none text-black-50'}>
                            Главная
                        </NavLink>
                        <NavLink to={'/beers/page/1'} className={'text-decoration-none  text-black-50'}>
                            Товары
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavRouter;