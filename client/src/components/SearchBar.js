import React,{useContext} from 'react';
import {Context} from "../index";
import {Form, InputGroup} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const SearchBar = observer(() => {
    const {device} = useContext(Context)

    const searchDevice = (e) => {
        e.preventDefault()
        device.setSearchOption(e.target.value)
        device.setChangedDevices(device.devices.filter(
            dev => dev.name.toLowerCase().includes(device.searchOption.toLowerCase())))
    }

    return (
        <div>
            <InputGroup>
                <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    placeholder="Поиск.."
                    value={device.searchOption}
                    onChange={e =>
                        searchDevice(e)
                    }
                />
            </InputGroup>

        </div>
    );
});

export default SearchBar;