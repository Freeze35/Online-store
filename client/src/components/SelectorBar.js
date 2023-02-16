import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import Accordion from 'react-bootstrap/Accordion'
import {Context} from "../index";
import "./accordion.css"
import {v4} from "uuid";
import {fetchDevices} from "../http/deviceApi";

const SelectorBar = observer(() => {
    const {device} = useContext(Context)

    useEffect(()=>{
        device.devices.map(dev=>{
            device.setCurrentBrands(Array.from(new Set([...device.currentBrands,dev.brandId])))}
        )}
    ,[])

    //Функция выборки типов для последующей передачи на сервер для входных параметров where id: [1,5,6]
    const brandCheck = (e, brand) => {
        if (e.target.checked) {
            device.setSelectedBrand([...device.selectedBrand, brand.id])
        }
        else {
            let index = device.selectedBrand.indexOf(brand.id)
            if (index > -1) {
                device.selectedBrand.splice(index, 1)
                device.setSelectedBrand(device.selectedBrand)

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

    const checkBrand =async (brand,type)=>{
            await fetchDevices(type.id,brand.id,1,2)
            .then(data =>
            {

                console.log(type.id,brand.id,data.count === 1)
            })
        /*device.devices.map(dev=>{
            console.log(brand.id === dev.brandId && type.id === dev.typeId)
            return brand.id === dev.brandId && type.id === dev.typeId
        })*/




        //return device.currentBrands.includes(brand.id)
        //let brandId = []
        //device.brands.map(br => brandId.push(br.id))
        //device.currentBrands.map(idCurrentBrand=>brand.id.includes(idCurrentBrand))
    }

    const typeCheckHeader1 = (e, type) => {

        //Array.from(device.brands.map(br => console.log(br.id)))
        console.log(device.currentBrands)
        console.log(device.currentBrands) //.map(curBrand => console.log(curBrand))
        if (device.expand === `true` && device.selectedType.length) {
            //console.log(device.brands.map(m=>device.currentBrands.map(d=> d=== true)))
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
                }
            })
        } else if (device.expand) {
            device.setSelectedType(Array.from(new Set([...device.selectedType, type.id])))
        }
    }

    return (

        <div style={{boxShadow: "0px 0px 3px black", borderRadius: 5, padding: 20}}>
            {device.types.map(type =>

                <Accordion key={v4()} style={{alignItems: "center"}}>
                    <Accordion.Item key={v4()} eventKey="0">
                        <Accordion.Header key={v4()} className="mr-auto" style={{borderRadius: 2}}
                                          onClick={(e) => typeCheckHeader(e, type)}>
                            {type.name}</Accordion.Header>
                        <Accordion.Body style={{overflow: "auto", maxHeight: 200}}>
                            <h4 style={{marginLeft: 6, marginTop: 10, color: "#007afe"}}>Брэнды</h4>

                                {device.brands.map(brand =>{
                                    if(checkBrand(brand,type)){
                                    return(<div key={v4()}>
                                        <div key={v4()} className="form-check"
                                             style={{marginLeft: 8, marginTop: 10}}>

                                            <label key={v4()}
                                                   className="form-check-label d-flex justify-content-between"
                                                   style={{cursor: "pointer"}}>
                                                <input key={v4()} className="form-check-input"
                                                       style={{height: 16, width: 16, cursor: "pointer"}}
                                                       type="checkbox"
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