import React, {useContext} from 'react';
import {Button, Col, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import "../styles.css"
import SearchBar from "./SearchBar";
import basket_white from "../asstes/basket_icon_white.png"

const NavBar = observer(() => {
    const {user} = useContext(Context)
    let navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        user.setUserId("not_authorized")
    }

    return (
        <Navbar className="mb-3 p-3 mb-5" style={{background:"#030028",boxShadow: "0px 0px 25px black"}} variant="dark">
            <Container >
                <NavLink to ={SHOP_ROUTE} >Магазин</NavLink>
                <Col className="me-3 "><SearchBar className="ml-auto" /></Col>
                        <img className="basket_img_style" style={{width:35,height:35,marginRight:15,marginLeft:5}} src={basket_white}
                               onClick={()=>navigate(BASKET_ROUTE+"/"+(user.userId))} alt={basket_white}/>
                    {user.isAuth && user.userId!=="not_authorized"
                        ?
                            <Nav className="ml-auto" style={{color:"white"}}>
                                <Button variant="outline-light"  className="me-3 m-2" onClick={()=> {
                                    navigate(ADMIN_ROUTE)
                                }}>Админ панель</Button>
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