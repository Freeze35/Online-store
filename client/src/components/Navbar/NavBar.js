import React, {useContext} from 'react';
import {Button, Col} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import {Context} from "../../index.js";
import {observer} from "mobx-react-lite";
import "../styles/styles.css"
import SearchBar from "../SearchBar/SearchBar";
import basket_white from "../../asstes/basket_icon_white.png"
import "./NavBar.css"

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
        <div className="mb-3 p-3 mb-5" style={{background:"#030028",boxShadow: "0px 0px 25px black"
            ,position:"sticky",top:0,zIndex:10}}>
            <div className="inside_navbar_block">
                <NavLink to ={SHOP_ROUTE} >Магазин</NavLink>
                <NavLink to ={SHOP_ROUTE} style={{marginLeft:15}}>О нас</NavLink>
                <Col className="me-3"><SearchBar/></Col>
                        <img className="basket_img" src={basket_white}
                               onClick={()=>navigate(BASKET_ROUTE+"/"+(user.userId))} alt=""/>
                    {user.isAuth && user.userId!=="not_authorized"
                        ?
                            <div >
                                <Button variant="outline-light"  className="me-3 m-2" onClick={()=> {
                                    navigate(ADMIN_ROUTE)
                                }}>Админ панель</Button>
                                <Button variant="outline-light"  className="me-3 m-2"  onClick={() => logOut()}>Выйти</Button>
                            </div>
                        : <button className="auth_button" onClick={()=>navigate(LOGIN_ROUTE)}>Авторизация</button>
                    }
            </div>
        </div>
    );
});

export default NavBar;