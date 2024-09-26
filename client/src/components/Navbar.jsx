import React, { useContext } from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContex';
import Notification from './chart/Notification';
function NavBar() {
    const { user, logoutUser } = useContext(AuthContext);

    return (



        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <h2>
                        <Link to="/" className='link-loght text-decoration-none'>
                            Chat App
                        </Link>
                    </h2>
                    {user && <span className='text-warning'> Logged in as {user?.name}</span>}
                    <Nav>
                        <Stack direction='horizontal' gap={3}>
                        <Notification />
                            {user ?
                                <Link to="/" className='link-loght text-decoration-none' onClick={() => logoutUser()}>logout</Link>
                                :
                                <>
                                    <Link to="/login" className='link-loght text-decoration-none'>Login</Link>
                                    <Link to="/register" className='link-loght text-decoration-none'>Register</Link>
                                </>
                            }
                        </Stack>
                    </Nav>
                    {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
                   
                </Container>
            </Navbar>


        </>
    );
}


export default NavBar