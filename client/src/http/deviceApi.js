import {$authHost, $host} from "./index";

    export const createTypes = async (type) =>{
    // проверка авторизованности на сервере по токену соответветсвенно используется  $authHost
    // server/routes/typeRoutes.js router.post('/',checkRoleMiddlware("ADMIN"), typeController.create)
    const {data} = await $authHost.post('api/type', type)
    return data
    }

    export const fetchTypes = async () =>{
    const {data} = await $host.get("api/type")
    return data
    }

    export const createBrand = async (brand) =>{
    // проверка авторизованности на сервере по токену используется  $authHost
    // server/routes/typeRoutes.js router.post('/',checkRoleMiddlware("ADMIN"), typeController.create)
    const {data} = await $authHost.post("api/brand",brand)
    return data
    }

    export const fetchBrands = async () =>{
    const {data} = await $host.get("api/brand")
    return data
    }

    // проверка авторизованности на сервере по токену соответветсвенно используется  $authHost
    // server/routes/typeRoutes.js router.post('/',checkRoleMiddlware("ADMIN"), typeController.create)
    export const createDevice = async (device) => {
        const {data} = await $authHost.post('api/device', device)
        return data
    }

    export const fetchDevices = async (typeId, brandId, page, limit,limitPrice) => {
        const {data} = await $host.get('api/device', {params: {
                typeId, brandId, page, limit,limitPrice
            }})
        return data
    }

    export const fetchOneDevice = async (id) => {
        const {data} = await $host.get('api/device/' + id)
        return data
    }

    export const deleteOneInfoDevice = async (id) => {
    const {data} = await $authHost.delete('api/device-info/' + id)
    return data
    }

    export const createDeviceInfo = async (info) => {
    const {data} = await $authHost.post('api/device-info', info)
    return data
    }

    export const updateDeviceInfo = async (info,deviceId,infoId) => {
    const {data} = await $authHost.put('api/device-info/'+deviceId, info, deviceId, infoId)
    return data
    }



