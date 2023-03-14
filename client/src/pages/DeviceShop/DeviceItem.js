import React, {useContext} from 'react';
import {Card, Col, Image} from "react-bootstrap";
import star from "../../asstes/star.png"
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE} from "../../utils/consts";
import "./buttonDeviceAddToBasket.css"
import {addToBasket} from "./AddDeviceToBasket";
import {Context} from "../../index.js";
import add_to_basket from "../../asstes/add_to_basket.png";

const DeviceItem = ({device, brands}) => {
    let navigate = useNavigate();
    const {user} = useContext(Context)
    const setName = () => {
        return brands.map(brand => {
            if (brand.id === device.brandId) {
                let splitNames = device.name.split(" ")
                if (brand.name === splitNames[0]) {
                    return ""
                } else {
                    return brand.name
                }
            }
        })
    }

    return (
        <Col md={3}>
            <Card style={{
                width: 200,
                height: 250,
                cursor: "pointer",
                border: "light",
                boxShadow: "0px 0px 4px black",
                borderRadius: 5
            }} className="mt-3"
                  onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}
            >

                <Image style={{width: 150, height: 150}} src={process.env.REACT_APP_API_URL + device.img}
                       className={"rounded mx-auto d-block"}
                />
                <div className="d-flex justify-content-between align-items-center"
                     style={{marginLeft: 10, fontWeight: 600}}>
                    <div>
                        {setName()} {device.name}
                    </div>
                    <div className="d-flex align-items-center" style={{fontSize: 20}}>
                        <div>{device.rating}</div>
                        <Image src={star} style={{width: 20, height: 20}}></Image>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center"
                     style={{fontWeight: 600}}>
                    <div className="d-flex " style={{fontSize: 25, marginLeft: 10, color: "#007afe"}}>
                        {device.price} <label style={{fontSize:20,marginLeft:5}}>руб.</label>
                    </div>
                    <button className="buttonAddToBasket" onClick={e=> {
                        addToBasket(user, device.id)
                        e.stopPropagation()
                    }} >
                        <img className="add_to_basket" style={{width:35,height:35}} src={add_to_basket}
                             alt={add_to_basket}/>
                    </button>
                </div>
            </Card>
        </Col>
    );
};

export default DeviceItem;