const express = require("express");
const {User, UserTypeMap} = require("../models/user");
const router = express.Router();
const database = require("../db");
const {Predmet} = require("../models/predmet");
/* GET users listing. */

 async function getAllUsers() {
    const rawUsers = await database.getAllData("Students");
    return rawUsers.map((rawUser) => new User(rawUser));
}
async function getUserById(id) {
    const rawUsers = await database.getDataById("Students", id);
    return rawUsers.map((rawUser) => new User(rawUser));
}
router.get("/:id", async function (req, res, next) {

    const id = req.params.id;

    const predmetsRaw = await database.getPredmetWithOutMarkById(id);
    const predmets = predmetsRaw.map(predmet => new Predmet(predmet))

    res.render("predmetByUserId", { predmets: predmets});
});

module.exports = router;
