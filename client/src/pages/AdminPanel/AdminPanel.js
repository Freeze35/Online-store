import React, {useContext, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";

import CreateDevice from "../../components/modals/CreateDevice";
import CreateBrand from "../../components/modals/CreateBrand";
import CreateType from "../../components/modals/CreateType";
import "./AdminPanel.css"
import {Context} from "../../index";

const AdminPanel = () => {

    const  [visibleType,setTypeVisible]=useState(false)
    const  [deviceVisible,setDeviceVisible]=useState(false)
    const  [brandVisible,setBrandVisible]=useState(false)
    const {device}=useContext(Context)
    console.log(device.changedDevices)
    return (
<Row>
    <Col md={3} className="d-flex justify-content-between align-items-center">
        <Container style={{marginLeft:100}}>
            <Button className="mt-3 add_new"
                    variant={"outline-primary"}
                    onClick={()=>setTypeVisible(true)}
            >
                Добавить тип
            </Button>
            <Button className="add_new"
                    variant={"outline-primary"}
                    onClick={()=>setBrandVisible(true)}
            >
                Добавить бренд
            </Button >
            <Button className="add_new"
                    variant={"outline-primary"}
                    onClick={()=>setDeviceVisible(true)}
            >
                Добавить устройство
            </Button>
            <CreateBrand show={brandVisible} onHide={()=>{setBrandVisible(false)}}/>
            <CreateType show={visibleType} onHide={()=>{setTypeVisible(false)}}/>
            <CreateDevice show={deviceVisible} onHide={()=>{setDeviceVisible(false)}}/>
        </Container>
    </Col>
    <Col md={9}>
        <div>
            <div className="property">
                {device.types.map(type =>
                <>{type.name}, </>)
                }
            </div>
            <div className="property">
                {device.brands.map(brand =>
                    <>{brand.name}, </>)
                }
            </div>
            <div className="property">
                {device.devices.map(dev =>
                    <>{dev.name}, </>)
                }
            </div>
        </div>
    </Col>
</Row>
    );
};

export default AdminPanel;