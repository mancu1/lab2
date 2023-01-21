const express = require("express");
const {User, UserTypeMap} = require("../models/user");
const router = express.Router();
const database = require("../db");
const {Major} = require("../models/major");
/* GET users listing. */

 async function getAllUsers() {
    return  await database.getAllData("Students");
}

async function getAllMajors() {
    return  await database.getAllData("Spec");
}

async function removeUserById(id) {
     return await database.removeFromTableById("Students", id);
}
async function getUserById(id) {
    const rawUsers = await database.getDataById("Students", id);
    return rawUsers;
}

/**
 *
 * @param id {number}
 * @param userData {User}
 * @returns {Promise<unknown>}
 */
async function updateRecordById(id, userData) {
    const sql = `UPDATE Students SET
            ФИО = ?,
            Пол = ?,
            Дата_рождения = ?,
            Код_специальности = ?,
            Очная_форма_обучения = ?,
            Родители = ?,
            Адресс = ?,
            Телефон = ?,
            Паспорт = ?,
            Номер_зачетки = ?,
            Дата_поступления = ?,
            Группа = ?,
            Курс = ?
            WHERE Код = ?`;
    const params = [userData.FIO, userData.Gender, userData.bd,userData.Id_major, userData.Is_ochnay, userData.Parents, userData.Address, userData.Phone, userData.Passport, userData.ZachetNumber, userData.StartDate, userData.Group, userData.Curs, id];
    return new Promise((resolve, reject) => {
        database.db.run(sql, params, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

/**
 *
 * @param userData {User}
 * @returns {Promise<unknown>}
 */
async function createRecordById(userData) {
    const sql = `INSERT INTO Students 
(ФИО, 
Пол, 
Дата_рождения, 
Код_специальности,
Очная_форма_обучения,
Родители, 
Адресс, 
Телефон, 
Паспорт, 
Номер_зачетки, 
Дата_поступления, 
Группа, 
Курс)
VALUES (?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [userData.FIO, userData.Gender, userData.bd, userData.Id_major, userData.Is_ochnay, userData.Parents, userData.Address, userData.Phone, userData.Passport, userData.ZachetNumber, userData.StartDate, userData.Group, userData.Curs];
    return new Promise((resolve, reject) => {
        database.db.run(sql, params, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}


router.get("/:id", async function (req, res, next) {

    const id = req.params.id;
    const numberId = Number(id);

    /**
     *
     * @type {Array}
     */
    const majorListRaw = await getAllMajors();
    const majors = majorListRaw.map(majorRaw => new Major(majorRaw))
    /**
     *
     * @type {Array}
     */
    const userListRaw = await getAllUsers();


    const count = userListRaw.length;
    const isExist = numberId >= 1 && numberId <= count;


    const key = isExist?numberId: 'new';
    const user = isExist ? new User(await getUserById(key - 1)) : null;


    res.render("userById", {majors , user, count, key});
});

router.post("/", async function (req, res, next) {

    /**
     *
     * @type {User}
     */
    const user = req.body;
    if (user.id) {
        //update
        try {
            await updateRecordById(user.id, user);
            return res.status(200).send();
        } catch (err) {
            console.log(err);
            return res.status(502).send(err);
        }
    } else {
        //create
        try {
            await createRecordById(user);
            return res.status(200).send();
        } catch (err) {
            console.log(err);
            return res.status(502).send(err);
        }
    }
    return res.status(400).send();

})
router.delete("/:id", async function (req, res, next) {

    const id = req.params.id;
    const numberId = Number(id);

    removeUserById(numberId).then(() => {
        res.status(200).send()
    }).catch((err) => {
        res.status(400).json(JSON.stringify(err))
    })
})

module.exports = router;
