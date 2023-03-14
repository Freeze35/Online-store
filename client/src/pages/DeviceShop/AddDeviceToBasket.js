import {fetchOneDevice} from "../../http/deviceApi";


    // Добавление элемента в массив user.basket

    const addToBasket = (user,id) => {
        fetchOneDevice(id).then(data => {
                if (user.basket.find(d => d.deviceId === data.id)) {
                    user.setBasket(user.basket.map(el => el.deviceId === data.id ? {
                        ...el,
                        numberOfDevices: el.numberOfDevices + 1
                    } : el))
                } else {
                    user.setBasket([...user.basket, {
                        name: data.name,
                        price: data.price,
                        deviceId: data.id,
                        numberOfDevices: 1,
                        img: data.img,
                        brandId:data.brandId
                    }])
                }
            }
        )
    }

export {addToBasket};