
const PagesLimit = (device) => {
    let totalC = device.totalCount
    const limit = 8
    let offset = device.page * limit - limit
    let newDevices = []

    /*if(optionDevice.sortOptions.length){
        console.log(optionDevice.sortOptions)
        sortList(device,optionDevice.sortOptions.sortValue)
    }*/
    const limitDevs = (i) => {
        totalC = ~~totalC
        return i < (totalC - offset + limit <= ~limit
            ? totalC - offset + limit
            : totalC - offset <= limit
                ? totalC - offset
                : totalC <= limit
                    ? totalC
                    : limit)
    }
    for (let i = 0; limitDevs(i); i++) {
        let idOffset = offset + i
        newDevices = [...newDevices, device.changedDevices[idOffset]]
    }

    device.setChangedDevices(newDevices)
};

export default PagesLimit;