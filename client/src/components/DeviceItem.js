import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import star from "../asstes/star.png"
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE} from "../utils/consts";
const DeviceItem = ({device}) => {
    let navigate = useNavigate();
    return (
        <Col md = {3} >
            <Card style={{width:200,height:200,cursor:"pointer",border:"light",boxShadow:"0px 0px 4px black", margin:5, borderRadius:5}} className="mt-3"
            onClick={()=> navigate(DEVICE_ROUTE+"/"+device.id)}
            >

                <Image style={{width:150,height:150}} src={process.env.REACT_APP_API_URL + device.img}
                       className={"rounded mx-auto d-block"}
                />

                <div className="text-black-90 d-flex justify-content-between align-items-center">
                    <div >
                        {device.brand}
                    </div>
                    <div className="d-flex align-items-center">
                        <div>{device.rating}</div>
                        <Image src={star} style={{width: 12, height: 12}}></Image>
                    </div>
                </div>
                <div  className="text-black-90 d-flex justify-content-center align-items-center">
                    {device.name}
                </div>
            </Card>
        </Col>
    );
};

export default DeviceItem;