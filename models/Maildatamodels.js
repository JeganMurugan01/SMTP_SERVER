const dbcon = require("../config/dbconfig.js");

const mailmodels = {
    sendingmail(maildata, callback) {
        dbcon.query("INSERT INTO maildata SET ?", maildata, (err, res) => {
            if (err) {
                console.error(err);
                callback("Failed to send email.");
            } else {
                callback("Mail sent successfully!");
            }
        });
    },
    getmaildatadb(callback) {
        dbcon.query("SELECT * FROM maildata", (err, res) => {
            if (err) {
                console.error(err);
                callback("Mail fetch error");
            } else {
                callback(null, res);
            }
        });
    },
    getbyid(callback) {
        dbcon.query("select * from maildata from where id = ?", id, (err, res) => {
            if (err) {
                callback(err);
            }
            if (res) {
                callback(res);
            }
        });
    },
};

module.exports = { mailmodels };
