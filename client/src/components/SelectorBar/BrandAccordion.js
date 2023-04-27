import React, {useState} from 'react';
import Scrollbars from "react-custom-scrollbars-2";
import {observer} from "mobx-react-lite";
import findDeviceByTypeAndBrandId from "../changeDevicesByBrandId";



const BrandAccordion = observer(({device, type, optionDevice}) => {
    const [open, setOPen] = useState(false)

    const findBrandInDevices = (brand, type) => {
        //Поиск сравнения всех брендов со списком device
        return optionDevice.typeBrandListId.find(d => d.typeId === type.id && d.brandId === brand.id) !== undefined
    }


    //Функция выборки типов для последующей передачи на сервер для входных параметров where id: [1,5,6]
    //Альтернатива внутренняя выборка
    const brandCheck = (e, brand, type) => {
        if (e.target.checked) {
                //device.setSelectedType([type:brand.id])
            device.setSelectedBrand([...device.selectedBrand, brand.id])
            optionDevice.setSpecialID([...optionDevice.specialID, `${type.id}_${brand.id}`])
            findDeviceByTypeAndBrandId(device,optionDevice)
        }
        else {
            let index = device.selectedBrand.indexOf(brand.id)
            let indexID = optionDevice.specialID.indexOf(`${type.id}_${brand.id}`)
            device.selectedBrand.splice(index, 1)
            optionDevice.specialID.splice(indexID, 1)
            device.setSelectedBrand(Array.from(device.selectedBrand))
            optionDevice.setSpecialID(Array.from(optionDevice.specialID))
            findDeviceByTypeAndBrandId(device,optionDevice)
        }
    }

    const clickOnButtonAccordionBrand=()=>{
        setOPen(!open)
        device.brands.find(brand => {
            if (document.getElementById(`${type.id}_${brand.id}`) !== null &&
                optionDevice.specialID.find(id => id === `${type.id}_${brand.id}`)) {
                document.getElementById(`${type.id}_${brand.id}`).click()
            }
        })
    }

    return (
        <div key={`${type.id}a${type.name}`} className="accordion_block">
            <button className={open ? "inside_button button-accordion" : "inside_button button-accordion-closed"}

                    onClick={() => {
                        clickOnButtonAccordionBrand()
                    }}
                    id={`${type.id}w1${type.name}`}
                    key={`${type.id}w1${type.name}`}
                    aria-expanded={open}

            >
                Бренд
            </button>
            <div className={open ? "accordion-box-expanded inside_accordion_block"
                                 : "accordion-box"}
                 id={`${type.id}acb${type.name}`}
                 key={`${type.id}ac___sa${type.name}`}
            >
                <Scrollbars className="inside_scroll">
                    {device.brands.map((brand) => {
                        if (findBrandInDevices(brand, type)) {
                            return (
                                <div key={`${type.id}=--${brand.id}`} style={{margin: 5}} >
                                    <div key={`${type.id}=${brand.id}`}
                                         className="form-check"
                                         style={{marginLeft: 8, paddingTop: 5}}>
                                        <label
                                            className={open?"form-check-label d-flex justify-content-between"
                                                :"off_check"}
                                            style={{cursor: "pointer"}}>
                                            <input key={`${type.id}_${brand.id}`}
                                                   id={`${type.id}_${brand.id}`}
                                                   className="form-check-input"

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
                                </div>)
                        }
                    })}
                </Scrollbars>
            </div>
        </div>)
});

export default BrandAccordion;

/*fetchDevices(Array.from(new Set(device.selectedType))
                    , Array.from(new Set(device.selectedBrand)), device.page).then(data => {
                    device.setDevices(data.rows)
                    device.setTotalCount(data.count)
                    device.setChangedDevices(data.rows)
                })*/