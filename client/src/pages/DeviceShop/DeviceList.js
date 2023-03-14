import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index.js";
import DeviceItem from "./DeviceItem";
import {Row} from "react-bootstrap";


const DeviceList = observer(() => {
    const {device}=useContext(Context)
    let brands = device.brands
    return (
        <Row className="d-flex">
            {device.changedDevices.length>0
                ?
                device.changedDevices.map(device=>
             <DeviceItem key={device.id} device={device} brands={brands}/>)
                :<label style={{fontSize:40,alignItems:"center",justifyContent:"center",margin:110}}>Товары не найдены</label>
            }
        </Row>
    );
});

export default DeviceList;