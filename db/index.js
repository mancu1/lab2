const path = require("path");
const sqlite3 = require("sqlite3").verbose();

class Database {
    constructor() {
        this.db = new sqlite3.Database(path.resolve(__dirname, "student.db"), (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log("Connected to the SQLite database.");
        });
    }
    removeFromTableById(table, id) {
        return new Promise((resolve, reject) => {
            this.db.run(`DELETE FROM ${table} WHERE "Код" = ?`, [id], (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }

    getAllData(table) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM ${table}`, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    }

    getUniqueCourse() {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT DISTINCT Курс from Students`, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
        //
    }
    getCountStudentByCourse(course) {
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT COUNT(Код) as courseCount FROM Students WHERE Курс = ?`, [course], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
        //
    }

    getDataById(table, id) {
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT * FROM ${table}  LIMIT 1 OFFSET ?`, [id], (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }

    getPredmetWithOutMarkById(id) {
        return new Promise((resolve, reject) => {
            this.db.all(
                `SELECT * FROM Predmet p
          WHERE NOT EXISTS(SELECT * FROM Marks m 
          WHERE m.Код_студента = ? 
          AND p.Код = m.Код_предмета_1)`, [id],
                (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });

        });
    }

    close() {
        this.db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log("Close the database connection.");
        });
    }
}

const database = new Database();

module.exports = database;
