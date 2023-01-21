const express = require("express");
const {Predmet, PredmetTypeMap} = require("../models/predmet");
const router = express.Router();
const database = require("../db");



async function getAllPredmets() {
    return  await database.getAllData("Predmet");
}

async function removePredmetById(id) {
    return await database.removeFromTableById("Predmet", id);
}
async function getPredmetById(id) {
    const rawPredmets = await database.getDataById("Predmet", id);
    return rawPredmets;
}

/**
 *
 * @param id {number}
 * @param predmetData {Predmet}
 * @returns {Promise<unknown>}
 */
async function updateRecordById(id, predmetData) {
    const sql = `UPDATE Predmet SET
            Название = ?,
            Описание = ?,
            WHERE Код = ?`;
    const params = [predmetData.Name, predmetData.Description, id];
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
 * @param predmetData {Predmet}
 * @returns {Promise<unknown>}
 */
async function createRecordById(predmetData) {
    const sql = `INSERT INTO Predmet 
(Название, 
Описание)
VALUES (?, ?)`;
    const params = [predmetData.Name, predmetData.Description];
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
    const predmetListRaw = await getAllPredmets();
    const predmets = predmetListRaw.map(predmetRaw => new Predmet(predmetRaw))


    const count = predmetListRaw.length;
    const isExist = numberId >= 1 && numberId <= count;


    const key = isExist?numberId: 'new';
    const predmet = isExist ? new Predmet(await getPredmetById(key - 1)) : null;


    res.render("predmets", {predmet, count, key});
});

router.post("/", async function (req, res, next) {

    /**
     *
     * @type {Predmet}
     */
    const predmet = req.body;
    if (predmet.id) {
        //update
        try {
            await updateRecordById(predmet.id, predmet);
            return res.status(200).send();
        } catch (err) {
            console.log(err);
            return res.status(502).send(err);
        }
    } else {
        //create
        try {
            await createRecordById(predmet);
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

    removePredmetById(numberId).then(() => {
        res.status(200).send()
    }).catch((err) => {
        res.status(400).json(JSON.stringify(err))
    })
})

module.exports = router;
