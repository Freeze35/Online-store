import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateType from "../components/modals/CreateType";
import CreateDevice from "../components/modals/CreateDevice";
import CreateBrand from "../components/modals/CreateBrand";

const AdminPanel = () => {

    const  [visibleType,setTypeVisible]=useState(false)
    const  [deviceVisible,setDeviceVisible]=useState(false)
    const  [brandVisible,setBrandVisible]=useState(false)
    return (

        <Container>
            <Button className="mt-3 d-flex justify-content-center align-items-center"
                    variant={"outline-dark"} style={{width:100,height:100,marginLeft:20}}
                    onClick={()=>setTypeVisible(true)}
            >
                Добавить тип
            </Button>
            <Button className="mt-3 d-flex justify-content-center align-items-center"
                    variant={"outline-dark"} style={{width:100,height:100,marginLeft:20}}
                    onClick={()=>setBrandVisible(true)}
            >
                Добавить бренд
            </Button >
            <Button className="mt-3 d-flex justify-content-center align-items-center"
                    variant={"outline-dark"} style={{width:100,height:100,marginLeft:20}}
                    onClick={()=>setDeviceVisible(true)}
            >
                Добавить устройство
            </Button>
            <CreateBrand show={brandVisible} onHide={()=>{setBrandVisible(false)}}/>
            <CreateType show={visibleType} onHide={()=>{setTypeVisible(false)}}/>
            <CreateDevice show={deviceVisible} onHide={()=>{setDeviceVisible(false)}}/>
        </Container>
    );
};

export default AdminPanel;