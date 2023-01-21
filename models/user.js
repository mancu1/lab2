const database = require("../db");

const UserTypeMap = {
    "ФИО": "FIO",
    "Пол": "Gender",
    "Дата_рождения": "bd",
    "Родители": "Parents",
    "Адресс": "Address",
    "Телефон": "Phone",
    "Паспорт": "Passport",
    "Номер_зачетки": "ZachetNumber",
    "Дата_поступления": "StartDate",
    "Группа": "Group",
    "Курс": "Curs",
    "Код_специальности": "Id_major",
    "Очная_форма_обучения": "Is_ochnay",
    "Код":"id"
};
class User {

    id;
    FIO;
    Gender;
    bd;
    Id_major;
    Parents;
    Address;
    Phone;
    Passport;
    ZachetNumber;
    StartDate;
    Group;
    Curs;
    Is_ochnay;

    constructor(rawUser) {
        Object.keys(UserTypeMap).forEach((sourceKey) => {
            this[UserTypeMap[sourceKey]] = rawUser[sourceKey];
        });
        return this;
    }

    mapperClassToTable() {
        let targetObject = {};
        Object.keys(UserTypeMap).forEach((sourceKey) => {
            targetObject[sourceKey] = this[UserTypeMap[sourceKey]];
        });
        return targetObject;
    }

}

module.exports = {User, UserTypeMap};
