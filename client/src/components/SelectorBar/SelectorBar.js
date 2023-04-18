import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index.js";
import "../styles/accordion.css"
import "../styles/inputRange.css"
import PriceAccordion from "./PriceAccordion";
import TypeAccordion from "./TypeAccordion";
import BrandAccordion from "./BrandAccordion";

const SelectorBar = observer(() => {
    const {device, optionDevice} = useContext(Context)

    return (

        <div style={{boxShadow: "0px 0px 3px black", borderRadius: 5, padding: 20}}>
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

/*
Запасной вариант
## Функция выборки типов,брендов,характеристик для последующей передачи на сервер для входных параметров where id: [1,5,6]
##(подходит для любого выбираемого значения )
```
const typeCheckHeader = (type) => {
if (device.selectedType.length) {
device.selectedType.map(i => {
if (i === type.id) {
device.setSelectedType(device.selectedType.map(i => i).filter(i => i !== type.id))
} else {
device.setSelectedType(Array.from(new Set([...device.selectedType, type.id])))
}})} else {
device.setSelectedType(Array.from(new Set([...device.selectedType, type.id])))}}
```
 */
// Old option code brand and type check
/*

const findBrandInDevices = (brand, type) => {
        //Поиск сравнения всех брендов со списком девайсов
        return optionDevice.typeBrandListId.find(d => d.typeId === type.id && d.brandId === brand.id) !== undefined
    }

// setTimeout для получения атрибута aria-expanded иначе получаем противоположное состояние при нажатии
const typeCheckHeader = (e, type) => {
        e.stopPropagation()
        new Promise((res) => setTimeout(() => {
            device.setExpand(e.target.getAttribute("aria-expanded"))
            res(device.expand)

        }, 5))
            .then(() => {
                typeCheckHeader1(e, type)
            })
    }


    const typeCheckHeader1 = (e, type) => {
        if (device.expand === `true` && device.selectedType.length) {
            device.selectedType.map(i => {
                if (i === type.id) {
                    device.setSelectedType(device.selectedType.map(i => i).filter(i => i !== type.id))
                } else if (device.expand) {
                    device.setSelectedType(Array.from(new Set([...device.selectedType, type.id])))
                }
            })
        } else if (device.selectedType.length) {
            device.selectedType.map(i => {
                if (i === type.id) {
                    device.setSelectedType(device.selectedType.map(i => i).filter(i => i !== type.id))

                    if (
                        document.getElementById(`${type.id}w1${type.name}`)
                            .getAttribute("aria-expanded") === "true") {
                        itemsRef[`${type.id}w1${type.name}`].click()
                    }

                    device.brands.find(brand => {

                        if (document.getElementById(`${type.id}_${brand.id}`) !== null &&
                            optionDevice.specialID.find(id => id === `${type.id}_${brand.id}`)) {
                            itemsRef[`${type.id}_${brand.id}`].click()
                        }
                    })

                }
            })
        } else if (device.expand) {
            device.setSelectedType(Array.from(new Set([...device.selectedType, type.id])))

        }
    }


return(<div key={`${type.id}q${type.name}`}>

    <Accordion key={`${type.id}e${type.name}`} style={{alignItems: "center"}}>
        <Accordion.Item key={`${type.id}r${type.name}`} eventKey="0">
            <Accordion.Header key={`${type.id}t${type.name}`} className="mr-auto"
                              style={{borderRadius: 2}}
                              onClick={(e) => typeCheckHeader(e, type)}>
                {type.name}
            </Accordion.Header>
            <Accordion.Body className="shadow-inner" style={{
                boxShadow: "0px 0px 3px black inset",
                height: 250,
                borderRadius: 5,
                width: "auto"
            }}>
                <Scrollbars style={{height: 250, width: "auto"}}>
                    <Accordion style={{marginLeft: 10, marginTop: 10}}>
                        <Accordion.Item eventKey="11">
                            <Accordion.Header>
                                <Accordion.Button
                                    id={`${type.id}w1${type.name}`}
                                    ref={ref => itemsRef[`${type.id}w1${type.name}`] = ref}>
                                    Брэнд
                                </Accordion.Button>
                            </Accordion.Header>
                            <Accordion.Body style={{
                                boxShadow: "0px 0px 3px black inset",
                                borderRadius: 5,
                                width: "auto",
                                marginRight: 10
                            }}>
                                {device.brands.map((brand) => {
                                    if (findBrandInDevices(brand, type)) {
                                        return (
                                            <div key={`${type.id}g${brand.id}`}>
                                                <div key={`${type.id}=${brand.id}`}
                                                     className="form-check"
                                                     style={{marginLeft: 8, paddingTop: 5}}>
                                                    <label key={`${type.id}+${brand.id}`}
                                                           className="form-check-label d-flex justify-content-between"
                                                           style={{cursor: "pointer"}}>
                                                        <input key={`${type.id}_${brand.id}`}
                                                               id={`${type.id}_${brand.id}`}
                                                               className="form-check-input"
                                                               ref={ref => itemsRef[`${type.id}_${brand.id}`] = ref}
                                                               style={{
                                                                   height: 16,
                                                                   width: 16,
                                                                   cursor: "pointer"
                                                               }}
                                                               type="checkbox"
                                                               onChange={e => brandCheck(e, brand, type)}
                                                        />
                                                        {brand.name}
                                                    </label>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                                <br/>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>


                    <hr/>
                    <h4 style={{marginLeft: 6, marginTop: 10, color: "#007afe"}}>
                        Цена</h4>
                    <div style={{
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: 20
                    }}>
                        <PriceAccordion key={`${type.id}w1${type.name}`} type={type} reg={reg}
                                        setReg={setReg}>

                        </PriceAccordion>
                    </div>
                    <div className="values-wrapper">
                        <span>{min}</span>
                        <span>{max}</span>
                    </div>
                </Scrollbars>
            </Accordion.Body>
        </Accordion.Item>
    </Accordion>
    <hr/>
</div>)*/
