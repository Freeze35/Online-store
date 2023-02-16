### npm i

## express:
npm i  
Запуск серверной маршрутизации.  
Маршрутизация определяет, как приложение отвечает на клиентский запрос к конкретному адресу (конечной точке), которым является URI (или путь), и определенному методу запроса HTTP (GET, POST и т.д.).  
Каждый маршрут может иметь одну или несколько функций обработки, которые выполняются при сопоставлении маршрута.  
https://expressjs.com/ru/  

## pg
https://www.npmjs.com/package/pg  
POstgerSQL  
Чистый клиент JavaScript и собственные привязки libpq используют один и тот же API  
Пул соединений  
Расширяемый JS↔Приведение типов данных PostgreSQL  
Поддерживаемые функции PostgreSQL  

## pg-hstore
https://www.npmjs.com/package/pg-hstore  
Пакет узлов для сериализации и десериализации данных JSON в формат hstore.  

## sequelize
это Node.js на Object Relational Mapper , который упрощает работу с базами данных MySQL, MariaDB, SQLite, PostgreSQL и другими.  
https://sequelize.org/  
sequelize Позволаяет легко прописать параметры подключения к БД  
(.env) - Все данные для подключения  
(db.js) - Прописываем все параметры для подколючения.  
(const sequelize = require('./db')) - В фале index.js запрашиваем параметры для атентификации  
const startserver = async () =>{  
try{  
await sequelize.authenticate() - соответсвенное подключения БД  
await sequelize.async() - сверяет состояние схемы данных  
} catch  
В файле models создаем схемы для SQL базы данных и связи между ними  
Запрашиваем типы данных SQL из sequelize  
const {DataTypes} = require('sequelize')   

## cors
CORS — это пакет node.js для предоставления промежуточного программного обеспечения Connect / Express , которое можно использовать для включения CORS с различными параметрами.

## dotenv
Dotenv — это модуль с нулевой зависимостью, который загружает переменные среды из .env файла в файлы process.env.

## express-fileupload
Когда вы загружаете файл, он будет доступен из req.files

## uuid
генерируюет случайны id для того чтобы имена файлов были уникальными

## jsonwebtoken
библиотека для генарции JWT токена
## bcryprt
Шифрование JWT токена

## Argument types do not match parameters
Если вдруг у кого такая же ошибка, то вот решение:
в routes/index.js первые три строки сделать такими:
const Router = require('express')
let router;
router = new Router();
||
const express = require("express")
const router = express.Router()

Для получения статичных изображений вызываем path.resolve для получния пути обращения к текущей дерриктории и папке static
const path =require('path')
app.use(express.static(path.resolve(__dirname,"static")))

Device.findAndCountAll также возвращает нам количество това

# Frontend_part

## npm install

## axios
Это HTTP-клиент, основанный на Promise для node.js и браузера. 
Он изоморфный (= он может работать в браузере и node.js с той же базой кодов).

## react-router-dom
Пакет react-router-dom содержит привязки для использования React Router в веб-приложениях.

## mobx
Слежение за компонентами перерндер в случае изменения компонента
client/UserStore makeObservable(this)

## mobx-react-lite
observer - слежение за изменением параметров переданого элемента в AppRouter
makeAutoObservable(this) слежение за изменением параметров в самом контрукторе UserStore
## react-bootstrap client
https://getbootstrap.com/docs/5.0/utilities/spacing/  Margin and padding(Внешние и внутренние отступы)
https://getbootstrap.com/docs/5.0/utilities/flex/ Flex(растягивание или выравнивание элемента на странице)
https://mdbootstrap.com/docs/react/utilities/spacing/ Spacing
## uuid client
Позволяет генерировать уникальный криптографический ключ занимающий небольшое место
Пример использования в SelectorBar.js

```
<div>
{device.brands.map(brand=>
<div key={v4()}>
{brand}
</div>
</div>
```
## jwt-decode
https://www.npmjs.com/package/jwt-decode
Это небольшая библиотека браузера, которая помогает декодировать токен JWT, закодированный Base64Url.
## Связывание посредством Interceptors(Перехватчиками http/index.js) 
Вы можете перехватывать запросы или ответы до того, как они будут обработаны try,then или catch.
https://axios-http.com/docs/interceptors

## Получение имен полей из конcтруктора
 let parsedArray = JSON.parse(JSON.stringify(device.types)) // parse data for getting keys.name
 let keysNames = Object.keys(parsedArray[0])  - получаем имена полей из первого списк

