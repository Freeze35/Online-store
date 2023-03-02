import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Col, Container, Image, Row} from "react-bootstrap";
import {v4} from "uuid";
import {fetchBrands, fetchTypes} from "../http/deviceApi";

import BasketNumberOfDevicesInput from "../components/BasketNumberOfDevicesInput";
import {createBasketBuy} from "../http/basketApi";



const Basket = () => {
    const {user, device} = useContext(Context)
    let [totalAmount, setTotalAmount] = useState(0)


    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        console.log(user.userId==="not_authorized"?0:user.userId)
    }, [])


    const Pay =()=>{
        const formData = new FormData()
        formData.append('totalAmount', `${totalAmount}`)
        formData.append('basketData', JSON.stringify(user.basket))
        formData.append('basketId', user.userId==="not_authorized"?1:user.userId)
        createBasketBuy(formData).then(() => {})

    }

    return (
        <Container>
            <Row>
                <Col md={9}>
                    {user.basket.map(basketInfo => {
                            return (
                                <div key={v4()} className="d-flex bd-highlight mb-3"
                                     style={{boxShadow: "0px 0px 3px black", borderRadius: 5, padding: 20}}>
                                    <Image key={basketInfo.defaultValue} className="p-2 bd-highlight" style={{
                                        height: 120, width: 120, marginLeft: 50, boxShadow: "0px 0px 3px black",
                                        borderRadius: 5, padding: 5, margin: 22
                                    }}
                                           src={process.env.REACT_APP_API_URL + basketInfo.img}>
                                    </Image>
                                    <div key={v4()} className="m-auto align-self-center"
                                         style={{paddingRight: 40, fontSize: 40}}>
                                        {device.brands.map(b => b.id === basketInfo.brandId ? b.name : "")} {basketInfo.name}<br/>
                                    </div>
                                    <BasketNumberOfDevicesInput basketInfo={basketInfo} setTotalAmount={setTotalAmount} totalAmount={totalAmount}
                                                                />
                                </div>
                            )
                        }
                    )}
                </Col>
                <Col md={3}>
                    <div style={{boxShadow: "0px 0px 3px black", borderRadius: 5, padding: 20}}>
                        <label  style={{fontSize: 45,fontWeight:200}}>
                            К Оплате: <br/>
                        </label>
                        <label style={{ display:"inline-block", fontSize: 45,fontWeight:400,justifyContent:"center"}}>
                        {totalAmount}</label>
                        {user.userId!=="not_authorized"?
                            <button onClick={Pay}> Оплатить</button>:
                            <button onClick={Pay}> Авторизация</button>
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Basket;