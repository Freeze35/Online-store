import {$authHost, $host} from "./index";


export const fetchBasketInfo = async () =>{
    const {data} = await $host.get("api/basket")
    return data
}
export const createBasketBuy = async (basketData) => {
    const {data} = await $authHost.post('api/basket', basketData)
    return data
}