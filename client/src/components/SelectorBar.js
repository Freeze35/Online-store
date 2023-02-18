import React, {useCallback, useContext, useMemo, useState} from 'react';
import {observer} from "mobx-react-lite";
import Accordion from 'react-bootstrap/Accordion'
import {Context} from "../index";
import "./accordion.css"
import {v4} from "uuid";
import {fetchBrands, fetchDevices} from "../http/deviceApi";



const SelectorBar = observer(() => {
    const {device,optionDevice} = useContext(Context)
    const [checked,setChecked] = useState(false)



    const checkBrand =(brand,type)=>{
        return optionDevice.typeBrandListId.find(d=>d.typeId === type.id && d.brandId === brand.id) !== undefined
    }

    //Функция выборки типов для последующей передачи на сервер для входных параметров where id: [1,5,6]
    const brandCheck = (e, brand) => {
        if (e.target.checked) {
            device.setSelectedBrand([...device.selectedBrand, brand.id])
        }
        else {
            let index = device.selectedBrand.indexOf(brand.id)
            if (index > -1) {
                device.selectedBrand.splice(index, 1)
                device.setSelectedBrand(Array.from(device.selectedBrand))
                if(device.selectedBrand.length===0){
                    fetchDevices(Array.from(new Set(device.selectedType))
                        ,Array.from(new Set(device.selectedBrand)),device.page,10).then(data => {
                        device.setDevices(data.rows)
                        device.setTotalCount(data.count)
                        device.setChangedDevices(data.rows)
                    })
                }
            }

        }
    }

    // setTimeout для получения атрибута aria-expanded иначе получаем противоположное состояние при нажатии
    const typeCheckHeader = (e, type) => {
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
        }
        else if (device.selectedType.length) {
            device.selectedType.map(i => {
                if (i === type.id) {
                    device.setSelectedType(device.selectedType.map(i => i).filter(i => i !== type.id))
                    //optionDevice.typeBrandListId.find(d=>d.typeId === type.id && d.brandId === brand.id) !== undefined

                    device.setSelectedBrand(device.selectedBrand.filter(brand => {
                        if(optionDevice.typeBrandListId.find(brlist => {
                            return brlist.typeId !== type.id && brlist.brandId === brand
                        }) !== undefined){
                            return true
                        }
                    }))


                    console.log(device.selectedBrand)

                }
            })
        }
        else if (device.expand) {
            console.log(device.selectedType)
            device.setSelectedType(Array.from(new Set([...device.selectedType, type.id])))
        }
    }

    return (

        <div style={{boxShadow: "0px 0px 3px black", borderRadius: 5, padding: 20}}>
            {device.types.map((type,indexType) =>

                <Accordion key={v4()} style={{alignItems: "center"}}>
                    <Accordion.Item key={v4()} eventKey="0">
                        <Accordion.Header key={v4()} className="mr-auto" style={{borderRadius: 2}}
                                          onClick={(e) => typeCheckHeader(e, type)}>
                            {type.name}</Accordion.Header>
                        <Accordion.Body style={{overflow: "auto", maxHeight: 200}}>
                            <h4 style={{marginLeft: 6, marginTop: 10, color: "#007afe"}}>Брэнды</h4>
                                {device.brands.map((brand,indexBrand) =>{
                                    if(checkBrand(brand,type)){
                                    return(<div key={v4()}>
                                        <div key={v4()} className="form-check"
                                             style={{marginLeft: 8, marginTop: 10}}>

                                            <label key={v4()}
                                                   className="form-check-label d-flex justify-content-between"
                                                   style={{cursor: "pointer"}}>
                                                <input key={indexType*indexBrand} className="form-check-input"
                                                       style={{height: 16, width: 16, cursor: "pointer"}}
                                                       type="checkbox"
                                                       //checked={checked}
                                                       onChange={e => brandCheck(e, brand)}
                                                />
                                                {brand.name}
                                            </label>
                                        </div>
                                    </div>)
                                }})}
                        </Accordion.Body>
                        <hr></hr>
                    </Accordion.Item>
                </Accordion>
            )}
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