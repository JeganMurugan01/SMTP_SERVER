const { Emailfilter } = require("../models/Mailfilter");

const mailfiltercontroller = {
    filter(req, response) {
        const subject = req.query.title;
        Emailfilter.mailfilter(subject, (err, data) => {
            console.log(data, "response search");
            console.log(err, "response err");
            if (err) {
                response.status(400).send({ Error: "Something went wrong" });
            }
            if (data) {
                response.status(200).send(data);
            }
        });
    },
};
module.exports = { mailfiltercontroller };
