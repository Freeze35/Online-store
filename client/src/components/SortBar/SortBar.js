import React, {useContext} from 'react';
import {Context} from "../../index.js";
import "./SortBar.css"
import RotateArrow from "../helpers/RotateArrow/RotateArrow";
const SortBar = () => {
    const {device} = useContext(Context)

    const options = [
        {value: "name", name: "Название"},
        {value: "price", name: "Цена"}]

    const sortMethods = {
        name: {method: (a, b) => a[`name`].localeCompare(b[`name`])},
        price: {method: (a, b) => a[`price`] - b[`price`]}
    };

    const checkLast =(options,index,addingClass)=>{
        return options.length === ~~(index+1)
            ? `button_toggles last_toggles ${addingClass}`
            : `button_toggles ${addingClass}`
    }

    const sortingData = (e, option,index) => {

        let element = document.getElementById(option.value)
        let sortList = () => {
            device.setChangedDevices([...device.changedDevices].sort(sortMethods[e.target.getAttribute("value")].method))
        }
        if (e.target.checked) {

            const activeClass= "button_toggles_active"
            element.className = checkLast(options,index,activeClass)
            document.getElementById(`${option.value}rotate${option.name}`).click()
            sortList()
        } else {
            element.className = checkLast(options,index)
            document.getElementById(`${option.value}rotate${option.name}`).click()
            sortList()
            device.setChangedDevices([...device.changedDevices].reverse())
        }
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