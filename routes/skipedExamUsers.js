const express = require("express");
const {User, UserTypeMap} = require("../models/user");
const router = express.Router();
const database = require("../db");
/* GET users listing. */

 async function getAllUsers() {
    return  await database.getAllData("Students");
}
// async function getUserById(id) {
//     const rawUsers = await database.getDataById("Students", id);
//     return rawUsers.map((rawUser) => new User(rawUser));
// }

router.get("/", async function (req, res, next) {

    const userListRaw = await getAllUsers();

    const userList = userListRaw.map(userRaw => new User(userRaw));




    res.render("skipedExamUsers", {list: userList});
});

module.exports = router;
