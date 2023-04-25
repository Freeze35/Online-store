import React,{useContext} from 'react';
import {Context} from "../../index.js";
import {Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import "./SearchBar.css"
const SearchBar = observer(({className,style}) => {
    const {device} = useContext(Context)

    const searchDevice = (e) => {
        e.preventDefault()
        device.setSearchOption(e.target.value)
        device.setChangedDevices(device.devices.filter(
            dev => dev.name.toLowerCase().includes(device.searchOption.toLowerCase())))
    }

    return (
                <Form.Control className={`input_form ${className}`}  style={style}
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    placeholder="Поиск.."
                    value={device.searchOption}
                    onChange={e =>
                        searchDevice(e)
                    }
                />
    );
});

export default SearchBar;