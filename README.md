# Проект онлайн магазина на основе:
## React,Express,PostgerSQL,Node.js
## Также для frontend части соберём реакт приложение с помощью webpack
### Для запуска потребуется установить PostgerSQL и Node.js
### После чего запустить npm run dev или npm run server(запустит сам сервер отдельно). Произойдёт инициализация таблиц хранения данных.
## В папке храниться Бд для импорта в ## Pg server/RestoreDataBasePGSQL/online-store.sql
### [Как импортировать sql file in PGSQL](https://www.youtube.com/watch?v=3AKIA8pu8YY)  
    Сейчас порт сервер установлен на мок сервер с портом 3000
    для подключения к стандартному PGSQL port = 5001 server
    client .env port-server = 3000
    Команды для старта приложения,
    Также запуска клиента и сервера отдельно.
    В папке уже находиться собранный frontend react webpack 
    build Для пересборки webpack frontend 
    Готовый проект находиться в папке dist
    startprod:webpack Для просмотра готовой сборки запустите 

    "server": "npm run dev --prefix server",
    "client": "npm run start --prefix client",
    "start-reactClient-postServer": "start npm run server && start npm run client",
    "start-webpack-dev": "npm run start-webpack-devServer --prefix client",
    "start-webpack-prod": "start-webpack-prodServer --prefix client",
    "startPostServer": "npm run start --prefix server",
    "build-webpack-prod": "build-webpack-prod --prefix client"
# Backend(server)
## express
Запуск серверной маршрутизации.  
Маршрутизация определяет, как приложение отвечает на клиентский запрос к конкретному адресу (конечной точке), которым является URI (или путь), и определенному методу запроса HTTP (GET, POST и т.д.).  
Каждый маршрут может иметь одну или несколько функций обработки, которые выполняются при сопоставлении маршрута.  
https://expressjs.com/ru/

## pg
https://www.npmjs.com/package/pg  
PostgerSQL  
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
CORS — это пакет node.js для предоставления промежуточного программного обеспечения Connect / Express , 
которое можно использовать для включения CORS с различными параметрами.
[Ссылка на понимаении CORS](https://learn.javascript.ru/fetch-crossorigin)

## dotenv
Dotenv — это модуль с нулевой зависимостью, который загружает переменные среды из .env файла в файлы process.env.

## express-fileupload
Когда вы загружаете файл, он будет доступен из req.files

## jsonwebtoken
библиотека для генерации JWT токена
## bcryptjs-react
Шифрование JWT токена

# Frontend(client)

## npm install

## axios
Это HTTP-клиент, основанный на Promise для node.js и браузера. 
Он изоморфный (= он может работать в браузере и node.js с той же базой кодов).

## react-router-dom
Пакет react-router-dom содержит привязки для использования React Router в веб-приложениях.

## mobx
Слежение за компонентами перерндер в случае изменения компонента
client/store, constructor => makeAutoObservable(this) 
// не использовать makeObservable

## mobx-react-lite
observer - слежение за изменением параметров переданного элемента в AppRouter
makeAutoObservable(this) слежение за изменением параметров в самом контрукторе UserStore
## react-bootstrap client
https://getbootstrap.com/docs/5.0/utilities/spacing/  Margin and padding(Внешние и внутренние отступы)
https://getbootstrap.com/docs/5.0/utilities/flex/ Flex(растягивание или выравнивание элемента на странице)
https://mdbootstrap.com/docs/react/utilities/spacing/ Spacing

## jwt-decode
https://www.npmjs.com/package/jwt-decode
Это небольшая библиотека браузера, которая помогает декодировать токен JWT, закодированный Base64Url.

## Связывание посредством Interceptors(Перехватчиками http/index.js) 
Вы можете перехватывать запросы или ответы до того, как они будут обработаны try,then или catch.
https://axios-http.com/docs/interceptors

## react-slider
В данном случае слайдер для ценового диапазона RangeSlider => SelectorBar.js
## react-custom-scrollbars-2
Custom scrollbar для react <Scrollbars>
## uuid
генерируюет случайны id для того чтобы имена файлов были уникальными
Не рекомендуется использовать для вложенных изменяющихся элементов с
индивидуальным состоянием к примеру в SelectorBar.js
setOpen вложенный элемент Toggle
поэтому формируются ключи из входных параметров (exemplar type)
Также это косается передачи в дочерние эелементы
``` 
 map(type =>
<Toggle key={v4()} type={type}/> 
<Toggle key={`${type.id}w${type.name}`} type={type}/> 
)
```

### WEBPACK

## webpack
 [webpack](https://webpack.js.org/guides/getting-started/#using-a-configuration)  
Инструмент для сборки JS приложений.  
Позволяет собирать проект в один общий в папке dist  
Посредством указания в файле webpack.config.js loader
 @babel/preset-env',"@babel/preset-react 
При инициализации модуля следуеет ссылаться на входной js => index.js файл
Исправление ошибок при сборке bundle
 [async_hooks error](https://stackoverflow.com/questions/71484777/module-not-found-cant-resolve-async-hooks)  
 [buffer assert error](https://stackoverflow.com/questions/61631937/cant-resolve-buffer-in-c-portal-node-modules-string-decoder-node-modules-s)  
 [crypto,os,browser and another. Or we can just add to wenbpack.config.js 
 resolve: fallback: fs,os,...: false,
](https://stackoverflow.com/questions/64557638/how-to-polyfill-node-core-modules-in-webpack-5)  
[Module not found : net](https://stackoverflow.com/questions/54275069/module-not-found-error-cant-resolve-net-in-node-modules-stompjs-lib)  
[Webpack WARNING in ./node_modules/express/lib/view.js, externals: {
express: 'express'}](https://stackoverflow.com/questions/50105076/webpack-warning-in-node-modules-express-lib-view-js-critical-dependency-the-r)
## dotenv-webpack
[Если подключаете сборку на основе Webpack потребуется dotenv-webpack ](https://stackoverflow.com/questions/59759085/heroku-failed-to-load-env)  
Он предоставляет распознание файлов .env из корня проекта 
## webpack-cli
[webpack-cli](https://www.npmjs.com/package/webpack-cli)  
Для доступа к некоторым командам веб-пакета через CLI, таким как запуск сервера разработки, создание рабочей сборки и т. д.
## webpack html-webpack-plugin clean-webpack-plugin
[html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/)
[clean-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/)
Упрощает создание файлов HTML для обслуживания ваших пакетов веб-пакетов.
## --save-dev style-loader css-loader scss-loader less-loader filer-loader
Loaders for webpack файлы которые распознает webpack для компиляции  
рекомендуется только как dev зависисмость
## babel-loader
[babel](https://babeljs.io/setup#installation)
## @babel/preset-react
[Webpack: Bundle.js — Uncaught ReferenceError](https://stackoverflow.com/questions/41359504/webpack-bundle-js-uncaught-referenceerror-process-is-not-defined)  
## babel/preset-env
Исправление ошибки запуска React App
Если вы используете Babel и React >17, вам может понадобиться добавить «runtime»  
[["@babel/preset-react", {"runtime": "automatic"}]](https://stackoverflow.com/questions/32070303/uncaught-referenceerror-react-is-not-defined)
## babel/polyfill
[babel/polyfill](https://babeljs.io/docs/babel-polyfill)
## babel-loader
[babel-loader](https://webpack.js.org/loaders/babel-loader/)
## Невозможно загрузить файл ps1
[Решение](https://zawindows.ru/%D1%80%D0%B5%D1%88%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BF%D1%80%D0%BE%D0%B1%D0%BB%D0%B5%D0%BC%D1%8B-%D0%BD%D0%B5%D0%B2%D0%BE%D0%B7%D0%BC%D0%BE%D0%B6%D0%BD%D0%BE-%D0%B7%D0%B0%D0%B3%D1%80%D1%83%D0%B7/)
Скрипт для Windows:  
Set-ExecutionPolicy unrestricted

## [Mocker-api](https://www.npmjs.com/package/mocker-api?activeTab=readme) Moker-Api For concetion mocker server
If we wanted connecting to our local store PostgreSQL change our client/.env file  
REACT_APP_API_URL="http://localhost:5001/"  
Creating options for server  using webpack or a
call api.app or another calling value (api,..) api.app  
end set path to our file mocker (api)  
CRUD server set in client/mocker/api.js
```
devServer: {
        onBeforeSetupMiddleware(api){
            apiMocker(api.app, path.resolve('./mocker/api.js'),
                {
                    proxy: {
                        '/repos/(.*)': 'https://api.github.com/',
                    },
                    changeHost: true,
                })
        }
    },
```

add in our api.js file new get,post,put,delete moker