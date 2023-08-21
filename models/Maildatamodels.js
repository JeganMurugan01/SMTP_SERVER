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
    getmaildatadb(page, limit, callback) {
        console.log(page, "page value ");
        console.log(limit, "limit value ");
        const columns = ["id", "`from`", "`to`", "subject", "`Read`", "cc", "bcc", "html", "text", "title", "createdby"];
        const columnsStr = columns.join(", ");
        const offset = (page - 1) * limit;

        dbcon.query(`SELECT ${columnsStr} FROM maildata WHERE NOT tempdel = 1 ORDER BY id DESC LIMIT ? OFFSET ?`, [limit, offset], (err, res) => {
            if (err) {
                console.error(err);
                callback("Mail fetch error");
            } else {
                dbcon.query("SELECT COUNT(id) AS totalCount FROM maildata WHERE NOT tempdel = 1", (err, page) => {
                    if (err) {
                        console.error(err);
                        callback("Mail count fetch error");
                    } else {
                        dbcon.query("SELECT count(*) AS totalCount FROM maildata WHERE `Read`=0 and tempdel=0", (err, result) => {
                            if (err) {
                                console.log("error occuring in count ", err);
                            } else {
                                const unreadCount = result[0].totalCount;
                                console.log("Total count:", unreadCount);
                                callback(null, { data: res, totalcount: page[0].totalCount, unreadcount: unreadCount });
                            }
                        });
                    }
                });
            }
        });
    },

    getbyid(id, callback) {
        dbcon.query("SELECT * FROM maildata WHERE id = ? AND tempdel= 0", [id], (err, res) => {
            if (err) {
                console.error(err);
                callback("Error fetching mail by ID");
            } else {
                callback(null, res);
            }
        });
    },
    gettrsabyid(id, callback) {
        dbcon.query("SELECT * FROM maildata WHERE id = ? AND tempdel= 1", [id], (err, res) => {
            if (err) {
                console.error(err);
                callback("Error fetching mail by ID");
            } else {
                callback(null, res);
            }
        });
    },
    deletemail(id, callback) {
        dbcon.query("SELECT * FROM maildata WHERE id = ?", [id], (err, res) => {
            if (err) {
                console.error("Error while fetching mail data:", err);
                callback({ data: "Error while fetching mail data" });
                return;
            }

            if (res && res.length > 0) {
                dbcon.query("UPDATE maildata SET tempdel = '1' WHERE id = ?", [id], (err, response) => {
                    if (err) {
                        console.error("Error while deleting mail:", err);
                        callback({ data: "Failed to delete the mail" });
                        return;
                    }

                    callback({ data: "Mail deleted successfully" });
                });
            } else {
                callback({ data: "No mail found with the provided ID" });
            }
        });
    },

    updatemail(data, callback) {
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

                callback(null, { data: "Updated successfully!" });
            });
        });
    },
    trashmail(callback) {
        const columns = ["id", "`from`", "`to`", "subject", "cc", "bcc", "html", "text", "title", "createdby"];
        const columnsStr = columns.join(", ");
        dbcon.query(`SELECT ${columnsStr} FROM maildata where tempdel=1`, (err, res) => {
            if (err) {
                callback(err);
                console.log("error in trash mail", err);
            }
            if (res) {
                callback(res);
            }
        });
    },
    deletetrash(callback) {
        dbcon.query("DELETE FROM maildata WHERE tempdel = 1", (err, res) => {
            if (err) {
                callback(err);
                console.log("deltetrash error ", err);
            } else {
                if (res.affectedRows > 0) {
                    callback({ data: "Deleted successfully" });
                } else {
                    callback({ data: "No data found" });
                }
            }
        });
    },
};

module.exports = { mailmodels };
