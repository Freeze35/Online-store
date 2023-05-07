import ChangeDevicesByPrice from "./changeDevicesByPrice";
import ChangeDevicesByTypeId from "./changeDevicesByTypeId";
import findDeviceByTypeAndBrandId from "./changeDevicesByBrandId";

const CheckTypesBrandsPrices = (device, optionDevice) => {

        const checkPrice =() =>{
            if(optionDevice.limitPrice.length) {
                ChangeDevicesByPrice(device, optionDevice)
            }
        }

        if (!device.selectedBrand.length && device.selectedType.length) {
            ChangeDevicesByTypeId(device)
            checkPrice()
        } else if(device.selectedType.length) {
            findDeviceByTypeAndBrandId(device, optionDevice)
            checkPrice()
        }
        else if(!device.selectedType.length) {
            device.setChangedDevices(device.devices)
        }
        device.setTotalCount(device.changedDevices.length)

};

export default CheckTypesBrandsPrices;