import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index.js";
import DeviceItem from "./DeviceItem";
import "./DeviceList.css"

const DeviceList = observer(() => {
    const {device}=useContext(Context)
    let brands = device.brands



    return (
        <div className={ device.changedDevices.length>0 ?"device_list" :""}>
            {device.changedDevices.length>0
                ?
                device.changedDevices.map(device=>
             <DeviceItem key={device.id} device={device} brands={brands}/>)
                :<label className="not_find">Товары не найдены</label>
            }
        </div>
    );
});

export default DeviceList;