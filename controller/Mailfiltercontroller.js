const { Emailfilter } = require("../models/Mailfilter");

const mailfiltercontroller = {
    filter(req, response) {
        const subject = req.query.title;
        Emailfilter.mailfilter(subject, (err, data) => {
            if (err) {
                response.status(400).send({ Error: "Something went wrong" });
            }
            if (data) {
                response.status(200).send(data);
            }
        });
    },
    mailfilter(req,response)
    {
        const mailid= req.query.email
        Emailfilter.filterwithEmail(mailid,(err,data)=>{
            if (err) {
                response.status(500).send(err);
            }
            else if(data)
            {
                response.status(200).send(data);
            }
        })
    }
};
module.exports = { mailfiltercontroller };
