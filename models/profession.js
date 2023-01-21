
const PrrofessionTypeMap = {
    "Название": "Name",
    "Описание": "Description",
    "Код":"id"
};
class Prrofession {
    Name;
    Description;
    id;
    constructor(rawUser) {
        Object.keys(PrrofessionTypeMap).forEach((sourceKey) => {
            this[PrrofessionTypeMap[sourceKey]] = rawUser[sourceKey];
        });
        return this;
    }

    mapperClassToTable() {
        let targetObject = {};
        Object.keys(PrrofessionTypeMap).forEach((sourceKey) => {
            targetObject[sourceKey] = this[PrrofessionTypeMap[sourceKey]];
        });
        return this;
    }

}

module.exports = Prrofession;
