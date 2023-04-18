
const ChangeDevicesByTypeId = (device) => {
    device.setChangedDevices(device.devices.filter(inDev =>
        device.selectedType.find(inType =>
            inDev.typeId === inType
        ) !== undefined
    ))
};

export default ChangeDevicesByTypeId;