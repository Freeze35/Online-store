import React, {useContext, useRef} from 'react';
import {observer} from "mobx-react-lite";
import Accordion from 'react-bootstrap/Accordion'
import {Context} from "../index";
import "./accordion.css"
import {v4} from "uuid";
import {fetchDevices} from "../http/deviceApi";



const SelectorBar = observer(() => {
    const {device,optionDevice} = useContext(Context)

    const itemsRef = useRef(null);

    const checkBrand =(brand,type)=>{
        return optionDevice.typeBrandListId.find(d=> d.typeId === type.id && d.brandId === brand.id) !== undefined
    }

    //Функция выборки типов для последующей передачи на сервер для входных параметров where id: [1,5,6]
    const brandCheck = (e, brand,type) => {
        if (e.target.checked) {
            device.setSelectedBrand([...device.selectedBrand, brand.id])
            optionDevice.setSpecialID([...optionDevice.specialID,`${type.id}_${brand.id}`])

        }
        else {
            let index = device.selectedBrand.indexOf(brand.id)
            let indexID = optionDevice.specialID.indexOf(`${type.id}_${brand.id}`)
            if (index > -1 && indexID > -1) {
                device.selectedBrand.splice(index, 1)
                optionDevice.specialID.splice(indexID, 1)
                device.setSelectedBrand(Array.from(device.selectedBrand))
                optionDevice.setSpecialID(Array.from(optionDevice.specialID))
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
        console.log(optionDevice.specialID)
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

                    //device.selectedBrand.map(sd=>(sd[0]))
                    //optionDevice.typeBrandListId.find(d=>d.typeId === type.id && d.brandId === brand.id) !== undefined
                    //console.log(device.selectedBrand)
                    device.brands.find(brand => {

                    if(document.getElementById(`${type.id}_${brand.id}`) !== null &&
                        optionDevice.specialID.find(id=>id === `${type.id}_${brand.id}`)
                    ) {
                        //return brand.id
                        //console.log(optionDevice.specialID)
                        itemsRef[`${type.id}_${brand.id}`].click()
                        //console.log(document.getElementById(`${brlist.typeId}_${brlist.brandId}`).ariaChecked)
                    }})
                    /*device.brands.map(brand => {
                        console.log(brand.id)
                        //itemsRef[`${type.id}_${brand}`].click()
                    })*/
                    /*device.setSelectedBrand(device.selectedBrand.filter(brand => {
                        console.log(brand)
                        if(document.getElementById(`${type.id}_${brand}`) !== null) {
                            itemsRef[`${type.id}_${brand}`].click()
                            //console.log(document.getElementById(`${brlist.typeId}_${brlist.brandId}`).ariaChecked)
                        }
                        if(optionDevice.typeBrandListId.find(brlist => {
                            //console.log(device.selectedBrand)
                            //console.log(type.id,brand,brlist.typeId,brlist.brandId)
                            console.log(brlist.typeId !== type.id && brlist.brandId === brand,type.id,brand)
                            //itemsRef.current[`${brlist.typeId}_${brlist.brandId}`].checked(false)
                            //console.log(document.getElementById(`${brlist.typeId}_${brlist.brandId}`))
                            //console.log(document.getElementById(`${brlist.typeId}_${brlist.brandId}`))
                            if(brlist.typeId !== type.id && brlist.brandId === brand){
                                return true

                            }
                                else if(document.getElementById(`${brlist.typeId}_${brlist.brandId}`) !== null) {
                                    console.log(`${type.id}_${brlist.brandId}`)
                                itemsRef[`${brlist.typeId}_${brlist.brandId}`].click()

                                //console.log(document.getElementById(`${brlist.typeId}_${brlist.brandId}`).ariaChecked)

                            }
                        }) !== undefined){
                            return true
                        }

                    }))*/

                    //itemsRef.current[``].checked=false

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
            {device.types.map((type) =>

                <Accordion key={v4()} style={{alignItems: "center"}}>
                    <Accordion.Item key={v4()} eventKey="0">
                        <Accordion.Header key={v4()} className="mr-auto" style={{borderRadius: 2}}
                                          onClick={(e) => typeCheckHeader(e, type)}>
                            {type.name}</Accordion.Header>
                        <Accordion.Body style={{overflow: "auto", maxHeight: 200}}>
                            <h4 style={{marginLeft: 6, marginTop: 10, color: "#007afe"}}>Брэнды</h4>
                                {device.brands.map((brand) =>{
                                    if(checkBrand(brand,type)){
                                    return(<div key={v4()}>
                                        <div key={v4()} className="form-check"
                                             style={{marginLeft: 8, marginTop: 10}}>

                                            <label key={v4()}
                                                   className="form-check-label d-flex justify-content-between"
                                                   style={{cursor: "pointer"}}>
                                                <input key={`${type.id}_${brand.id}`} id={`${type.id}_${brand.id}`}
                                                       className="form-check-input"
                                                       value={1}
                                                       ref={ref => itemsRef[`${type.id}_${brand.id}`] = ref}
                                                       style={{height: 16, width: 16, cursor: "pointer"}}
                                                       type="checkbox"
                                                       onChange={e => brandCheck(e, brand,type)}
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