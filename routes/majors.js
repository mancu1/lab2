const express = require("express");
const {Major, MajorTypeMap} = require("../models/major");
const router = express.Router();
const database = require("../db");



async function getAllMajors() {
    return  await database.getAllData("Spec");
}

async function removeMajorById(id) {
    return await database.removeFromTableById("Spec", id);
}
async function getMajorById(id) {
    const rawMajors = await database.getDataById("Spec", id);
    return rawMajors;
}

/**
 *
 * @param id {number}
 * @param majorData {Major}
 * @returns {Promise<unknown>}
 */
async function updateRecordById(id, majorData) {
    const sql = `UPDATE Spec SET
            Наименование = ?,
            Описание = ?,
            WHERE Код = ?`;
    const params = [majorData.Name, majorData.Description, id];
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
 * @param majorData {Major}
 * @returns {Promise<unknown>}
 */
async function createRecordById(majorData) {
    const sql = `INSERT INTO Spec 
(Наименование, 
Описание)
VALUES (?, ?)`;
    const params = [majorData.Name, majorData.Description];
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


    const count = majorListRaw.length;
    const isExist = numberId >= 1 && numberId <= count;


    const key = isExist?numberId: 'new';
    const major = isExist ? new Major(await getMajorById(key - 1)) : null;


    res.render("majors", {major, count, key});
});

router.post("/", async function (req, res, next) {

    /**
     *
     * @type {Major}
     */
    const major = req.body;
    if (major.id) {
        //update
        try {
            await updateRecordById(major.id, major);
            return res.status(200).send();
        } catch (err) {
            console.log(err);
            return res.status(502).send(err);
        }
    } else {
        //create
        try {
            await createRecordById(major);
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

    removeMajorById(numberId).then(() => {
        res.status(200).send()
    }).catch((err) => {
        res.status(400).json(JSON.stringify(err))
    })
})

module.exports = router;
