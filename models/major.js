
const MajorTypeMap = {
    "Наименование": "Name",
    "Описание": "Description",
    "Код":"id"
};
class Major {
    Name;
    Description;
    id;
    constructor(rawUser) {
        Object.keys(MajorTypeMap).forEach((sourceKey) => {
            this[MajorTypeMap[sourceKey]] = rawUser[sourceKey];
        });
        return this;
    }

    mapperClassToTable() {
        let targetObject = {};
        Object.keys(MajorTypeMap).forEach((sourceKey) => {
            targetObject[sourceKey] = this[MajorTypeMap[sourceKey]];
        });
        return this;
    }

}

module.exports = {Major, MajorTypeMap};
