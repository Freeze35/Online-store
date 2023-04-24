import React, {useContext, useState} from 'react';
import Scrollbars from "react-custom-scrollbars-2";
import {RangeSlider} from "react-double-range-slider";
import {Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index.js";
import "../styles/inputRange.css"


const PriceAccordion = observer(({children, type}) => {

    const {device, optionDevice} = useContext(Context)
    const [open, setOPen] = useState(false)
    const [rangeValues, setRangeValues] = useState({min: 0, max: 24});
    const [maxPrice, setMaxPrice] = useState(0);
    const offsetPriceMax = 5000

    const maxValue = () => {
        device.devices.map(d => {
            if (d.price > maxPrice && type.id === d.typeId) {
                setMaxPrice(d.price)
                setRangeValues({...rangeValues, max: d.price})
            }
        })

        return maxPrice+offsetPriceMax
    }
    const takeSliderParams = (min,max) => {
        if (optionDevice.limitPrice.length === 0 ||
            optionDevice.limitPrice.find(lp=>lp.typeId ===type.id) === undefined) {
            optionDevice.setLimitPrice([...optionDevice.limitPrice, {
                typeId: type.id,
                min: Number(min),
                max: Number(max)
            }])
        }

        else if (optionDevice.limitPrice.length > 0 &&
            optionDevice.limitPrice.find(lp => lp.typeId === type.id) !== undefined) {
            optionDevice.setLimitPrice(optionDevice.limitPrice.map(limitType =>
                limitType.typeId === type.id
                    ? {
                    ...limitType, min: Number(min),
                    max: Number(max)
                    } : limitType
            ))
        }
    }

    const addPriceSelector=(e,open,type)=>{
        if(!open){
            takeSliderParams(rangeValues.min,rangeValues.max)
        }
        else{
            optionDevice.setLimitPrice((optionDevice.limitPrice.filter(lp=>lp.typeId!==type.id)))
        }
    }

    const setupMinPrice =(e) =>{
        if (e.target.value > 0 && e.target.value < maxPrice) {
            setRangeValues({
                ...rangeValues,
                min: Number(e.target.value),max:rangeValues.max
            })
            takeSliderParams(Number(e.target.value),rangeValues.max)
        } else {
            //Set Limit
            setRangeValues({
                ...rangeValues,
                min: maxPrice
            })}
    }

    const setupMaxPrice =(e) =>{
        if (e.target.value > 0 && e.target.value > rangeValues.min
            && e.target.value< maxPrice) {
            setRangeValues({
                ...rangeValues,
                min: rangeValues.min, max:Number(e.target.value)
            })
            takeSliderParams(rangeValues.min,Number(e.target.value))
        } else {
            setRangeValues({...rangeValues, max: maxPrice})
            takeSliderParams(rangeValues.min,Number(e.target.value))
        }
        console.log(optionDevice.limitPrice)
    }

    return (
        <div key={`${type.id}p_a${type.name}`} className="accordion_block">
            <button className={open ? "inside_button button-accordion" : "inside_button button-accordion-closed"}
                    onClick={e => {
                        setOPen(!open)
                        addPriceSelector(e,open,type)
                    }}
                    aria-expanded={open}
                    id={`${type.id}p_a_button${type.name}`}
                    key={`${type.id}p_a_button${type.name}`}>
                Цена
            </button>

            <div key={`${type.id}a__fdcb${type.name}`}
                 className={open ? "accordion-box-expanded inside_accordion_block"
                                 : "accordion-box"}
                 id={`${type.id}acb${type.name}`}>
                <Scrollbars>
                    <div key={`${type.id}a__b${type.name}`} className="price_block">
                        {children}<br/>
                        <div className="price_setup">
                            <Form.Control value={rangeValues.min}
                                          onChange={setupMinPrice}/>
                            <Form.Control value={rangeValues.max}
                                          onChange={setupMaxPrice}/>
                        </div>
                    </div>
                    <div className="price_block" key={`${type.id}a__bs${type.name}`}>
                        <RangeSlider
                            key={`${type.id}a__bsd${type.name}`}
                                     id={`${type.id}a__bsd${type.name}`}
                                     value={{min: 0, max: maxValue()}}
                                     onChange={e => {
                                         setRangeValues({
                                             min: Number(e.min),
                                             max: Number(e.max)
                                         })
                                         takeSliderParams(e.min,e.max)
                                     }}
                                     formatter={(x) => `${x}`}
                                     tooltipPosition="over"
                                     tooltipVisibility="hover"
                        />
                    </div>
                </Scrollbars>
            </div>

        </div>)
});

export default PriceAccordion;