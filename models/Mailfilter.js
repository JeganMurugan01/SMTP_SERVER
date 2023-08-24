const dbcon = require("../config/dbconfig.js");

const Emailfilter = {
    mailfilter(body, callback) {
        dbcon.query(
            `SELECT * FROM maildata
            WHERE subject LIKE CONCAT("%", ?, "%") OR title LIKE CONCAT("%", ?, "%")ORDER BY id DESC;
            `,
            [body, body],
            (err, result) => {
                if (!err) {
                    if (result.length == 0) {
                        callback(null, "No data data found");
                    } else {
                        if (result.length > 0) {
                            callback(null, result);
                        }
                    }
                }
            }
        );
    },
};

module.exports = { Emailfilter };
