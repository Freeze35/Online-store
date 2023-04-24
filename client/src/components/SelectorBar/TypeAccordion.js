import React, {useEffect, useState} from 'react';
import Scrollbars from "react-custom-scrollbars-2";
import {observer} from "mobx-react-lite";
import ChangeDevicesByTypeId from "../changeDevicesByTypeId";
import checkTypesBrandsPrices from "../checkTypesBrandsPrices";

const TypeAccordion = observer(({children, device, type, optionDevice}) => {
    const [open, setOPen] = useState(false)

    useEffect(() => {
        checkTypesBrandsPrices(device,optionDevice)
    }, [device.selectedType,optionDevice.limitPrice, device.selectedBrand])

    const typeCheckHeader = (e, type) => {
        setOPen(!open)
        if (!open && device.selectedType.length) {
            device.selectedType.map(i => {
                if (i === type.id) {
                    device.setSelectedType(device.selectedType.map(i => i).filter(i => i !== type.id))
                    device.setChangedDevices(device.devices.map(dev => dev).filter(dev => dev !== type.id))
                } else if (!open) {
                    device.setSelectedType(Array.from(new Set([...device.selectedType, type.id])))
                    checkTypesBrandsPrices(device,optionDevice)
                }
            })

        } else if (device.selectedType.length) {
            device.selectedType.map(i => {
                if (i === type.id) {
                    device.setSelectedType(device.selectedType.map(i => i).filter(i => i !== type.id))
                    ChangeDevicesByTypeId(device)
                    //If all closed return all devices
                    if (!device.selectedType.length) {
                        device.setChangedDevices(device.devices)
                    }
                    //click on brand Button in sliderType
                    if (document.getElementById(`${type.id}w1${type.name}`)
                        .getAttribute("aria-expanded") === "true") {
                        document.getElementById(`${type.id}w1${type.name}`).click()
                    }

                    //clear all marks brand in closed in sliderType
                    device.brands.find(brand => {
                        if (document.getElementById(`${type.id}_${brand.id}`) !== null &&
                            optionDevice.specialID.find(id => id === `${type.id}_${brand.id}`)) {
                            document.getElementById(`${type.id}_${brand.id}`).click()
                        }
                    })
                    //click on price Button in sliderType
                    if (document.getElementById(`${type.id}p_a_button${type.name}`)
                        .getAttribute("class") === "button-accordion") {
                        document.getElementById(`${type.id}p_a_button${type.name}`).click()
                    }
                    //clear price selector
                    checkTypesBrandsPrices(device,optionDevice)
                }
            })

        } else if (!open) {
            device.setSelectedType(Array.from(new Set([...device.selectedType, type.id])))
            ChangeDevicesByTypeId(device)
        }
    }

    const notLast =()=> {
        return device.types[device.types.length - 1].name === type.name
    }

    return (

        <div key={`${type.id}axcddf${type.name}`}
             style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
            <button className={open ? "button-accordion" : "button-accordion-closed"}
                    key={`${type.id}t${type.name}`}
                    id={`${type.id}t${type.name}`}

                    onClick={(e) => {
                        typeCheckHeader(e, type)
                    }}>
                {type.name}
            </button>
            {notLast()?"":<hr className="hr"/>}
            {open && notLast()? <hr className="hr" /> : ""}
            <div key={`${type.id}a__a${type.name}`} className={open ? "accordion-box-expanded" : "accordion-box"}
                 id={`${type.id}a__a${type.name}`}>
                <Scrollbars>
                        {children}
                </Scrollbars>
            </div>
        </div>)
});

export default TypeAccordion;