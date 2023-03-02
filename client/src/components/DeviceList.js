import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import DeviceItem from "./DeviceItem";
import {Row} from "react-bootstrap";


const DeviceList = observer(() => {
    const {device}=useContext(Context)
    let brands = device.brands
    return (
        <Row className="d-flex">
            {device.changedDevices.map(device=>
             <DeviceItem key={device.id} device={device} brands={brands}/>
            )}
        </Row>
    );
});

export default DeviceList;