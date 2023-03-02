import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";

const BasketNumberOfDevicesInput = ({basketInfo,setTotalAmount}) => {
    const {user} = useContext(Context)
    const [numbersValue, setNumbersValue] = useState(1)

    useEffect(()=>{
        if(basketInfo.numberOfDevices !== numbersValue) {
            setNumbersValue(basketInfo.numberOfDevices)
        }
    },[])

    useEffect(()=>{
        setTotalAmount(user.basket.map(b=>b.numberOfDevices*b.price).reduce((prev,curr)=>prev+curr,0))
    },[user.basket])

    const changeNumbersDevicesBasket = () => {
        let valueOfDevices = document.getElementById(`${basketInfo.brandId}_${basketInfo.price}`).value
        setNumbersValue(valueOfDevices>0?valueOfDevices<9999?valueOfDevices:9999:1)
        user.setBasket(user.basket.map(el => el.deviceId === basketInfo.deviceId ? {
            ...el, numberOfDevices: valueOfDevices.length && valueOfDevices > 0 ? valueOfDevices<9999?valueOfDevices:9999 : 1
        } : el))

    }

    const decrement = () => {
        let number_of_devices = Number(document.getElementById(`${basketInfo.brandId}_${basketInfo.price}`).value)
        setNumbersValue(number_of_devices - 1 > 0 ? number_of_devices - 1 : 1)
        user.setBasket(user.basket.map(el => el.deviceId === basketInfo.deviceId ? {
            ...el, numberOfDevices: number_of_devices - 1 > 0 ? number_of_devices - 1 : 1
        } : el))
    }

    const increment = () => {
        let number_of_devices = Number(document.getElementById(`${basketInfo.brandId}_${basketInfo.price}`).value)
        setNumbersValue(number_of_devices<9999?number_of_devices + 1:9999)
        user.setBasket(user.basket.map(el => el.deviceId === basketInfo.deviceId ? {
            ...el, numberOfDevices: number_of_devices<9999?number_of_devices + 1:9999
        } : el))
    }

    return (
        <div id={`${basketInfo.brandId}_${basketInfo.price}_form-group_input`}
             className="form-group row align-items-center justify-content-center"
             style={{marginRight: 20, width: 160, fontSize: 30}}>
            <label >Цена:</label>
                <label >{basketInfo.price} руб.</label>
            <div className="input-group align-self-center">
                <div className="input-group-prepend align-self-center">
                    <button className="btn btn-outline-primary flex-column justify-content-center" style={{width:40,height:40,fontSize:25}} type="button"
                            onClick={() => decrement()}>-
                    </button>
                </div>
                <input id={`${basketInfo.brandId}_${basketInfo.price}`} type="text"
                       className="form-control align-self-center w-21"
                       aria-label="Recipient's username" aria-describedby="basic-addon2"
                       style={{
                           textAlign: "center", alignSelf: 'center',
                           fontSize: 20, alignContent: "center", height: 40
                       }}
                       value={numbersValue}
                       onChange={() => changeNumbersDevicesBasket()}/>
                <div className="input-group-append">
                    <button className="btn btn-outline-primary text-center d-flex flex-column justify-content-center" style={{width:40,height:40,fontSize:25}} type="button"
                            onClick={() => increment()}>
                        +
                    </button>
                </div>
            </div>
        </div>)
}

export default BasketNumberOfDevicesInput;