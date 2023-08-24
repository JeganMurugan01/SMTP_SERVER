const dbcon = require("../config/dbconfig.js");

const Emailfilter = {
    mailfilter(body, callback) {
        dbcon.query(
            `SELECT * FROM maildata
            WHERE subject LIKE CONCAT("%", ?, "%") OR title LIKE CONCAT("%", ?, "%")
            ORDER BY id DESC;
            `,
            [body, body],
            (err, result) => {
                if (!err) {
                    if (result.length === 0) {
                        callback(null, { message: "No data found", count: 0 });
                    } else {
                        const count = result.length;
                        callback(null, {data:result, count:count});
                    }
                } else {
                    callback(err, null);
                }
            }
        );
    },
};

module.exports = { Emailfilter };
