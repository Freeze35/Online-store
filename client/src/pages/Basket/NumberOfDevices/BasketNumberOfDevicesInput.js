import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../index.js";
import "./BasketNumberOfDevicesInput.css"

const BasketNumberOfDevicesInput = ({children, basketInfo, setTotalAmount}) => {
    const {user} = useContext(Context)
    const [numbersValue, setNumbersValue] = useState(1)
    const limitDevices = 999

    useEffect(() => {
        if (basketInfo.numberOfDevices !== numbersValue) {
            setNumbersValue(basketInfo.numberOfDevices)
        }
    }, [])

    useEffect(() => {
        setTotalAmount(user.basket.map(b => b.numberOfDevices * b.price).reduce((prev, curr) => prev + curr, 0))
    }, [user.basket])

    const changeNumbersDevicesBasket = () => {
        let valueOfDevices = document.getElementById(`${basketInfo.brandId}_${basketInfo.price}`).value
        setNumbersValue(valueOfDevices > 0
            ? valueOfDevices < limitDevices
                ? valueOfDevices : limitDevices
                : 1)
        user.setBasket(user.basket.map(el => el.deviceId === basketInfo.deviceId ? {
            ...el, numberOfDevices: valueOfDevices.length &&
            valueOfDevices > 0
                ? valueOfDevices < limitDevices
                    ? valueOfDevices
                    : limitDevices
                : 1
        } : el))

    }

    const decrement = () => {
        let number_of_devices = Number(document.getElementById(`${basketInfo.brandId}_${basketInfo.price}`).value)
        setNumbersValue(number_of_devices - 1 > 0 ? number_of_devices - 1 : 1)
        user.setBasket(user.basket.map(el => el.deviceId === basketInfo.deviceId ? {
            ...el, numberOfDevices:
                number_of_devices - 1 > 0
                    ? number_of_devices - 1
                    : 1
        } : el))
    }

    const increment = () => {
        let number_of_devices =
            Number(document.getElementById(`${basketInfo.brandId}_${basketInfo.price}`).value)
        setNumbersValue(number_of_devices < limitDevices
            ? number_of_devices + 1
            : limitDevices)
        user.setBasket(user.basket.map(el => el.deviceId === basketInfo.deviceId ? {
            ...el, numberOfDevices: number_of_devices < limitDevices
                ? number_of_devices + 1
                : limitDevices
        } : el))
    }

    return (
        <div id={`${basketInfo.brandId}_${basketInfo.price}_form-group_input`}
             className="block_number_of_devices"
        >
            <label>Цена:</label>
            <label className="price_basket_device">{basketInfo.price}
                <label className="currency">руб.</label> </label>
            <div className="number_of_devices_inside_block">
                <button className="number_of_dev_button left_button"
                        onClick={() => decrement()}> -
                </button>
                <input id={`${basketInfo.brandId}_${basketInfo.price}`} type="text"
                       className="input_number_of_dev"
                       value={numbersValue}
                       onChange={() => changeNumbersDevicesBasket()}
                />
                <button className="number_of_dev_button right_button"
                        onClick={() => increment()}>
                    +
                </button>
            </div>
            {children}
        </div>)
}

export default BasketNumberOfDevicesInput;