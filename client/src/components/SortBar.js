import React, {useContext} from 'react';
import {ToggleButtonGroup} from "react-bootstrap";
import {Context} from "../index";
import {v4} from "uuid";

const SortBar = () => {
    const {device} = useContext(Context)

    const options = [
        {value: "name", name: "По названию"},
        {value: "price", name: "По цене."}]

    const sortMethods = {
        name: {method: (a, b) => a[`name`].localeCompare(b[`name`])},
        price: {method: (a, b) => a[`price`] - b[`price`]}
    };

    const sortingData = (e,option) => {
        let element= document.getElementById(option.value)
        let sortList = () =>
            {device.setChangedDevices([...device.devices].sort(sortMethods[e.target.getAttribute("value")].method))}
        if(e.target.checked){

            element.className="btn btn-outline-success"
            sortList()
        }
        else{

            element.className="btn btn-outline-primary"
            sortList()
            device.setChangedDevices([...device.devices].reverse())
        }
    }



    return (
        <div>
            <ToggleButtonGroup type="checkbox" style={{marginLeft: 4}}>
                <label className="btn btn-primary"
                       style={{boxShadow: "0px 0px 3px black", cursor: "default"}}> Сортировка</label>
                {options.map((option) =>
                    <label key={v4()} id={option.value}
                           className={"btn btn-outline-primary"}
                           style={{boxShadow: "0px 0px 3px black",}}>
                        <input type="checkbox" style={{display: "none"}} className="btn-check"
                               value={option.value} key={v4()} onChange={e => {
                            sortingData(e,option)
                        }}
                        />
                        {option.name}</label>
                )}</ToggleButtonGroup>
        </div>
    );
};

export default SortBar;