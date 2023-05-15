
const findDeviceByTypeAndBrandId = (device,optionDevice)=>{

    // half of types what not have selected brands
    const returnNotUnaddedType =() =>{

        let selectedTypesNotInclude = device.selectedType.filter(sT=>
            optionDevice.specialID.map(spId=>~~spId.split("_")[0]).every(sPiD=>
                ~~sT !== ~~sPiD

            )
        )
        return device.devices.filter(dev =>
            selectedTypesNotInclude.find(STNI =>
                STNI === dev.typeId
            ) !== undefined
        )
    }
    //select all TypeId what includes in specialID ([6_2] 6-type Characters.txt-brandid)
    device.setChangedDevices(device.devices.filter(dev =>
        optionDevice.specialID.find(oneSpId =>
            ~~dev.typeId === ~~oneSpId.split("_")[0] && ~~dev.brandId === ~~oneSpId.split("_")[1]

        )
    ).concat(returnNotUnaddedType()))

}

export default findDeviceByTypeAndBrandId;