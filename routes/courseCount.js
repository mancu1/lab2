const express = require("express");
const {User, UserTypeMap} = require("../models/user");
const router = express.Router();
const database = require("../db");
/* GET users listing. */

async function getCountStudentByCourse(course) {
    return await database.getCountStudentByCourse(course);
}
async function getUserById(id) {
    const rawUsers = await database.getDataById("Students", id);
    return rawUsers.map((rawUser) => new User(rawUser));
}

router.get("/:course", async function (req, res, next) {

    const course = req.params.course;
    const courseCount = await getCountStudentByCourse(course);


    res.render("courseCount", {course,courseCount});
});

module.exports = router;
