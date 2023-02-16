import React, {useContext} from 'react';
import {Button, Col, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import "../styles.module.css"
import SearchBar from "./SearchBar";

const NavBar = observer(() => {
    const {user} = useContext(Context)

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        localStorage.removeItem('email')
    }

    let navigate = useNavigate()
    return (
        <Navbar className="mb-3 shadow-lg p-3 mb-5" style={{background:"#030028"}} variant="dark">
            <Container >
                <NavLink to ={SHOP_ROUTE} style={{color:"#ff9100"}}>Магазин</NavLink>
                <Col className="me-3 "><SearchBar className="ml-auto" /></Col>

                    {user.isAuth
                        ?
                            <Nav className="ml-auto" style={{color:"white"}}>
                                <Button variant="outline-light"  className="me-3 m-2" onClick={()=>navigate(ADMIN_ROUTE)}>Админ панель</Button>
                                <Button variant="outline-light"  className="me-3 m-2"  onClick={() => logOut()}>Выйти</Button>
                            </Nav>
                        :
                            <Nav className="ml-auto" style={{color:"white"}}>
                                <Button variant="outline-light" onClick={()=>navigate(LOGIN_ROUTE)}>Авторизация</Button>
                            </Nav>
                    }
            </Container>
        </Navbar>
    );
});

export default NavBar;