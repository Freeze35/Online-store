import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import "../components/styles/styles.css"
import {login, registration} from "../http/userApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index.js";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")



    const click = async () =>{
        let data = ""
        try {
            if (isLogin){
                data = login(email,password)
            }
            else {
                data = registration(email,password)
            }
            user.setUserId(localStorage.getItem("userId"))
            user.setUser(data)
            localStorage.setItem("email",email)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)

        }
        catch (e) {
            alert(e.response.data.message)

        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 160}}
        >
            <Card style={{width: 500,background:"#030028"}} className=" shadow-lg p-5 shadow-lg">
                <h2 className="m-auto text-white">{isLogin ? "Авторизация" :"Регистрация"}</h2>
                <Form className="d-flex flex-column " >
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите email.."
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите password.."
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-2">
                        {isLogin ?
                            <div className="me-5 text-white">
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div className="me-5 text-white">
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        }
                        <Button variant={"outline-light"} className="mt-3" onClick={click}>
                            {isLogin ?"Войти":"Регистрация"}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;