import React, {useContext} from 'react';
import {Context} from "../../index.js";
import RotateArrow from "../helpers/RotateArrow/RotateArrow";
import checkTypesBrandsPrices from "../checkTypesBrandsPrices";
import sortList from "./SortList/SortList";
import PagesLimit from "../Pages/PagesLimit";
import "./SortBar.css"

const SortBar = () => {
    const {device, optionDevice} = useContext(Context)

    const options = [
        {value: "name", name: "Название"},
        {value: "price", name: "Цена"}]

    const checkLast =(options,index)=>{
        return options.length === ~~(index+1)
            ? `button_toggles last_toggles`
            : `button_toggles`
    }


    const sortingData = (e, option,index) => {
        device.setChangedDevices(device.devices)
        checkTypesBrandsPrices(device, optionDevice)
        let sortValue = e.target.getAttribute("value")
        let element = document.getElementById(option.value)

        if (e.target.checked) {
            optionDevice.setSortOptions({sortOption:[`${option.value}`]})
            const activeClass= "button_toggles_active"
            element.className = checkLast(options,index,activeClass)
            document.getElementById(`${option.value}rotate${option.name}`).click()
            sortList(device,sortValue)
        } else {
            optionDevice.setSortOptions({sortOption:""})
            element.className = checkLast(options,index)
            document.getElementById(`${option.value}rotate${option.name}`).click()
            sortList(device,sortValue)
            device.setChangedDevices([...device.changedDevices].reverse())
        }
        PagesLimit(device,optionDevice)
    }

    return (
        <div className="toggle_group">

            <label className="sort_text button_toggles">
                Сортировка
            </label>
            {options.map((option,index) =>
                <label key={`${option.value}+${option.name}`} id={option.value}
                       className={checkLast(options,index)}
                >
                    <input type="checkbox" style={{display: "none"}} className="btn-check"
                           value={option.value} key={`${option.value}_${option.name}`} onChange={e => {
                        sortingData(e,option,index)

                    }}
                    />
                    {option.name}
                    <RotateArrow option={option}/>
                </label>
            )}</div>
    );
};

export default SortBar;