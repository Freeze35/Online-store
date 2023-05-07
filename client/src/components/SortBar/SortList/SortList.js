
const SortList = (device , sortValue) => {

    const sortMethods = {
        name: {method: (a, b) => a[`name`].localeCompare(b[`name`])},
        price: {method: (a, b) => a[`price`] - b[`price`]}
    };

    device.setChangedDevices([...device.changedDevices]
        .sort(sortMethods[sortValue].method))
};

export default SortList;