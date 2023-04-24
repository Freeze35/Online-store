import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index.js";
import "./accordion.css"
import PriceAccordion from "./PriceAccordion";
import TypeAccordion from "./TypeAccordion";
import BrandAccordion from "./BrandAccordion";
import "./SelectorBar.css"

const SelectorBar = observer(() => {
    const {device, optionDevice} = useContext(Context)

    return (
        <div className="selector_div">
            {device.types.map((type) => {
                return (
                    <TypeAccordion key={`${type.name}op${type.id}`} type={type} device={device}
                                   optionDevice={optionDevice}>
                        <BrandAccordion key={`${type.name}sop${type.id}`} device={device} type={type}
                                        optionDevice={optionDevice}/>
                        <hr/>
                        <PriceAccordion key={`${type.name}pop${type.id}`} type={type}/>
                    </TypeAccordion>
                )
            })}
        </div>

    );
});

export default SelectorBar;
