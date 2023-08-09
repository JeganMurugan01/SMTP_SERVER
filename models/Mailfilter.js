const dbcon = require('../config/dbconfig.js')

const Emailfilter = {
    mailfilter(body, id, callback) {
        dbcon.query(
            `SELECT * FROM (
                SELECT m.* FROM Login l
                LEFT JOIN maildata m ON m.to = l.mailid
                WHERE l.user_id = ?
            ) AS subquery
            WHERE subquery.subject LIKE CONCAT("%", ?, "%") OR subquery.title LIKE CONCAT("%", ?, "%");
            `,
            [id, body,body],
            (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            }
        );
    }
}

module.exports = { Emailfilter };
