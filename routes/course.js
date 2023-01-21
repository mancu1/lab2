const express = require("express");
const {User, UserTypeMap} = require("../models/user");
const router = express.Router();
const database = require("../db");
/* GET users listing. */

async function getUniqueCourse() {
    return await database.getUniqueCourse();
}
// async function getUserById(id) {
//     const rawUsers = await database.getDataById("Students", id);
//     return rawUsers.map((rawUser) => new User(rawUser));
// }

router.get("/", async function (req, res, next) {

    const courseList = await getUniqueCourse();


    res.render("course", {list: courseList});
});

module.exports = router;
