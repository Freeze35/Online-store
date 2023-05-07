import React, {useContext, useState} from 'react';
import {Button} from "react-bootstrap";

import CreateDevice from "../../components/modals/CreateDevice";
import CreateBrand from "../../components/modals/CreateBrand";
import CreateType from "../../components/modals/CreateType";
import "./AdminPanel.css"
import {Context} from "../../index.js";
import {observer} from "mobx-react-lite";

const AdminPanel = observer(() => {

    const  [visibleType,setTypeVisible]=useState(false)
    const  [deviceVisible,setDeviceVisible]=useState(false)
    const  [brandVisible,setBrandVisible]=useState(false)
    const {device}=useContext(Context)
    console.log(device.devices)
return (
<div className="admin_block">
    <div className="upper_add">
        <div className="add_container" >
            <Button className="add_new"
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
        </div>
    </div>
    <div className="down_property">
        <div className="property_block">
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
    </div>
</div>
    );
}
);

export default AdminPanel;