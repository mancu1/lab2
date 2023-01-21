
const PredmetTypeMap = {
    "Название": "Name",
    "Описание": "Description",
    "Код":"id"
};
class Predmet {
    Name;
    Description;
    id;
    constructor(rawPredmet) {
        Object.keys(PredmetTypeMap).forEach((sourceKey) => {
            this[PredmetTypeMap[sourceKey]] = rawPredmet[sourceKey];
        });
        return this;
    }

    mapperClassToTable() {
        let targetObject = {};
        Object.keys(PredmetTypeMap).forEach((sourceKey) => {
            targetObject[sourceKey] = this[PredmetTypeMap[sourceKey]];
        });
        return this;
    }

}

module.exports = {Predmet, PredmetTypeMap};
