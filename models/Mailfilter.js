const dbcon = require("../config/dbconfig.js");

const Emailfilter = {
    mailfilter(body, callback) {
        dbcon.query(
            `SELECT * FROM maildata
            WHERE (subject LIKE CONCAT("%", ?, "%") OR title LIKE CONCAT("%", ?, "%")) AND NOT tempdel = 1
            ORDER BY id DESC;
            `,
            [body, body],
            (err, result) => {
                if (!err) {
                    if (result.length === 0) {
                        callback(null, { message: "No data found", count: 0 });
                    } else {
                        const count = result.length;
                        callback(null, { data: result, count: count });
                    }
                } else {
                    callback(err, null);
                }
            }
        );
    },
    filterwithEmail(body, callback) {
        const columns = ["id", "`from`", "`to`", "subject", "`Read`", "cc", "bcc", "html", "text", "title", "createdby"];
        const columnsStr = columns.join(", ");
        dbcon.query(
            `SELECT ${columnsStr} FROM maildata
            WHERE (\`from\` LIKE CONCAT("%", ?, "%") OR \`to\` LIKE CONCAT("%", ?, "%")) AND NOT tempdel = 1
            ORDER BY id DESC`,
            [body, body],
            (err, res) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, res);
                }
            }
        );
    },
};

module.exports = { Emailfilter };
