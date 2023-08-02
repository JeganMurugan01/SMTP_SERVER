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
    getbyid(id, callback) {
        dbcon.query("SELECT * FROM maildata WHERE id = ?", [id], (err, res) => {
            if (err) {
                console.error(err);
                callback("Error fetching mail by ID");
            } else {
                callback(null, res);
            }
        });
    },
    deletemail(id, callback) {
        dbcon.query("SELECT * FROM maildata WHERE ID = ?", id, (err, res) => {
            if (res && res.length > 0) {
                dbcon.query("DELETE FROM maildata WHERE id=?", id, (err, response) => {
                    if (response) {
                        callback({ data: "Mail deleted successfully" });
                    } else {
                        callback({ data: "Failed to delete the mail" });
                    }
                });
            } else {
                callback({ data: "No mail found with the provided ID" });
            }
            if (err) {
                callback({ data: "Check the ID given" });
            }
        });
    },
};

module.exports = { mailmodels };
