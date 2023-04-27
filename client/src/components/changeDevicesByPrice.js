
const ChangeDevicesByPrice = (device,optionDevice) => {

        device.setChangedDevices(device.changedDevices.filter(
            changedDevice => {

                let objLimitPrice = optionDevice.limitPrice.find(limitP => limitP.typeId === changedDevice.typeId)
                let typeFind = optionDevice.limitPrice.find(limitP =>
                    device.selectedType.map(type => {

                        return type === changedDevice.typeId && type !== limitP.typeId
                    }))
                if (objLimitPrice !== undefined) {

                    return changedDevice.price >= objLimitPrice.min && objLimitPrice.max >= changedDevice.price
                } else if (typeFind !== undefined) {

                    return true
                }
            }
        ))

};

export default ChangeDevicesByPrice;