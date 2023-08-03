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
    updatemail(data, callback) {
        console.log(data, "data");
        dbcon.query("SELECT * from maildata WHERE id=?", [data.id], (err, res) => {
            if (err) {
                callback({ error: "Error fetching data from the database." });
                return;
            }

            if (res.length === 0) {
                callback({ error: "No data found for the given id." });
                return;
            }

            if (data.Read !== 0 && data.Read !== 1) {
                callback({ error: "Please check the update value." });
                return;
            }

            dbcon.query("UPDATE maildata SET `Read`=? WHERE id=?", [data.Read, data.id], (err, res) => {
                if (err) {
                    callback({ error: "Error updating data in the database." });
                    return;
                }
                
                callback(null,{ data: "Updated successfully!" });
            });
        });
    },
};

module.exports = { mailmodels };
