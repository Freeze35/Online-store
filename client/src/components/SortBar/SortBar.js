import React, {useContext} from 'react';
import {ToggleButtonGroup} from "react-bootstrap";
import {Context} from "../../index.js";


const SortBar = () => {
    const {device} = useContext(Context)

    const options = [
        {value: "name", name: "По названию"},
        {value: "price", name: "По цене."}]

    const sortMethods = {
        name: {method: (a, b) => a[`name`].localeCompare(b[`name`])},
        price: {method: (a, b) => a[`price`] - b[`price`]}
    };

    const sortingData = (e, option) => {
        let element = document.getElementById(option.value)
        let sortList = () => {
            device.setChangedDevices([...device.changedDevices].sort(sortMethods[e.target.getAttribute("value")].method))
        }
        if (e.target.checked) {
            element.className = "btn btn-outline-success"
            sortList()
        } else {
            element.className = "btn btn-outline-primary"
            sortList()
            device.setChangedDevices([...device.changedDevices].reverse())
        }
    }

    return (
        <ToggleButtonGroup type="checkbox" style={{marginLeft: 4, paddingTop: 10}}>
            <label className="btn btn-primary"
                   style={{boxShadow: "0px 0px 3px black", cursor: "default"}}> Сортировка</label>
            {options.map((option) =>
                <label key={`${option.value}+${option.name}`} id={option.value}
                       className={"btn btn-outline-primary"}
                       style={{boxShadow: "0px 0px 3px black",}}>
                    <input type="checkbox" style={{display: "none"}} className="btn-check"
                           value={option.value} key={`${option.value}_${option.name}`} onChange={e => {
                        sortingData(e, option)
                    }}
                    />
                    {option.name}</label>
            )}</ToggleButtonGroup>
    );
};

export default SortBar;