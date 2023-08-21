const dbcon = require("../config/dbconfig");

const trashdeletebyid = {
    trashdeleteid(id, callback) {
        console.log(id, "req id");
        dbcon.query("SELECT * FROM maildata where id=? and tempdel=1", [id], (err, res) => {
            if (err) {
                callback({ data: { eror: "mail not found" } });
            } else if (res && res.length === 0) {
                callback({ data: { message: "ID not available" } });
            } else {
                dbcon.query("DELETE FROM maildata WHERE id = ? AND tempdel = 1", [id], (err, res) => {
                    if (err) {
                        console.log(err, "error from delete particular mail id ");
                        callback(err);
                    } else if (res && res.affectedRows > 0) {
                        callback(res);
                        console.log(res, "response from delete mail id ");
                    }
                });
            }
        });
    },
};
module.exports = { trashdeletebyid };
