import React, {useState} from 'react';
import Scrollbars from "react-custom-scrollbars-2";
import {observer} from "mobx-react-lite";



const BrandAccordion = observer(({device, type, optionDevice}) => {
    const [open, setOPen] = useState(false)



    const findBrandInDevices = (brand, type) => {
        //Поиск сравнения всех брендов со списком device
        return optionDevice.typeBrandListId.find(d => d.typeId === type.id && d.brandId === brand.id) !== undefined
    }

    //Функция выборки типов для последующей передачи на сервер для входных параметров where id: [1,5,6]
    const brandCheck = (e, brand, type) => {
        if (e.target.checked) {
            device.setSelectedBrand([...device.selectedBrand, brand.id])
            optionDevice.setSpecialID([...optionDevice.specialID, `${type.id}_${brand.id}`])

        } else {
            let index = device.selectedBrand.indexOf(brand.id)
            let indexID = optionDevice.specialID.indexOf(`${type.id}_${brand.id}`)
            device.selectedBrand.splice(index, 1)
            optionDevice.specialID.splice(indexID, 1)
            device.setSelectedBrand(Array.from(device.selectedBrand))
            optionDevice.setSpecialID(Array.from(optionDevice.specialID))

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
        <div key={`${type.id}a${type.name}`}>
            <button className={open ? "button-accordion" : "button-accordion-closed"}
                    style={{
                        textAlign: "left", margin: 10, width: 180, minWidth: 180,
                        alignItems: "center",
                        justifyContent: "center", alignContent: "center"
                    }}
                    onClick={() => {
                        clickOnButtonAccordionBrand()
                    }}
                    id={`${type.id}w1${type.name}`}
                    key={`${type.id}w1${type.name}`}
                    aria-expanded={open}
            >
                Брэнд
            </button>
            <div className={open ? "accordion-box-expanded" : "accordion-box"}
                 id={`${type.id}acb${type.name}`}
                 style={{margin: 10, minWidth: 150, width: 180, marginTop: 0, maxHeight: 120}}
                 key={`${type.id}ac___sa${type.name}`}
            >
                <Scrollbars style={{height: 300, width: "auto", minWidth: 210}}>
                    {device.brands.map((brand) => {
                        if (findBrandInDevices(brand, type)) {
                            return (
                                <div key={`${type.id}=--${brand.id}`} style={{margin: 5}}>
                                    <div key={`${type.id}=${brand.id}`}
                                         className="form-check"
                                         style={{marginLeft: 8, paddingTop: 5}}>
                                        <label
                                            className="form-check-label d-flex justify-content-between"
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