const dbcon = require("../config/dbconfig");

const trashdeletebyid = {
    trashdeleteid(id, callback) {
        console.log(id, "req id");
        dbcon.query("SELECT * FROM maildata where id=? and tempdel=1", [id], (err, res) => {
            console.log(res, "response from delete by id");
            if (err) {
                callback({ Data:"mail not found" });
            } else if (res && res.length === 0) {
                callback({ Data: "ID not available" });
            } else {
                dbcon.query("DELETE FROM maildata WHERE id = ? AND tempdel = 1", [id], (err, res) => {
                    if (err) {
                        console.log(err, "error from delete particular mail id ");
                        callback(err);
                    } else if (res && res.affectedRows > 0) {
                        callback({ Data: "Mail deleted successfully" });
                    }
                });
            }
        });
    },
};
module.exports = { trashdeletebyid };
