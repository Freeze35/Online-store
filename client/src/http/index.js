import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

//Интерцептор.Функция которая принимает на входные данные config
const authIntrceptor = config=>{
 config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
 return config
}
//http/userApi присваваем получаемый токен localStorage.setItem("token",data.token)
$authHost.interceptors.request.use(authIntrceptor) // Добавляем перехватом наш токен к базому пути запроса

export{
    $host,
    $authHost
}