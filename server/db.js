const {Sequelize} = require('sequelize')

//Конфигурация

module.exports = new Sequelize(
    process.env.DB_NAME, // База данных к которой подключаемся
    process.env.DB_USER, // Имя пользователя подключения к БД
    process.env.DB_PASSWORD, //Пароль подключения к БД
    {
        dialect: 'postgres',    //тип БД к которой подклюаемся 'sqlite,postgres,MariaDB'
        host:process.env.DB_HOST,  //localhost
        port:process.env.DB_PORT   //Порт БД
    }
)