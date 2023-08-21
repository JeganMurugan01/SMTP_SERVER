const nodemailer = require("nodemailer");
const { mailmodels } = require("../models/Maildatamodels");
const { emailRegexp } = require("../Pageconstants");

const usermaildata = {
    async maildata(req, response) {
        const maildatareq = {
            from: req.body.From,
            to: req.body.To,
            subject: req.body.Subject,
            cc: req.body.Cc,
            bcc: req.body.Bcc,
            text: req.body.Text,
            html: req.body.Html,
            title: req.body.Title,
            createdby: req.body.CreatedBy,
            userid: req.body.userid,
        };
        async function createTestTransporter() {
            try {
                const transporter = nodemailer.createTransport({
                    host: "cidctrap.smtp.com",
                    port: 8000,
                    secure: false,
                    auth: {
                        user: "user",
                        pass: "Test@1234",
                    },
                });
                await transporter.verify();
                return transporter;
            } catch (error) {
                console.error("Error creating transporter:", error);
                throw error;
            }
        }

        try {
            let transporter = await createTestTransporter();
            const msg = {
                from: maildatareq.from,
                to: maildatareq.to,
                cc: maildatareq.cc,
                bcc: maildatareq.bcc,
                subject: maildatareq.subject,
                title: maildatareq.title,
                html: maildatareq.html,
                text: maildatareq.text,
            };
            if (emailRegexp.test(maildatareq.from) && emailRegexp.test(maildatareq.to)) {
                const info = await transporter.sendMail(msg);
                console.log("Message sent: %s", info.messageId);
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                mailmodels.sendingmail(maildatareq, (res) => {
                    response.status(200).send({ Response: res });
                });
            } else {
                response.status(400).send({ error: "Check the given data " });
            }
        } catch (error) {
            console.error(error, "error");
            response.status(500).send("Failed to send email.");
        }
    },
    getmaildata(req, res) {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.pageLimit);
        mailmodels.getmaildatadb(page, limit, (err, Result) => {
            if (err) {
                res.send("Mail fetch error");
            } else {
                res.send(Result);
            }
        });
    },
    getbyidcontroller(req, response) {
        const id = req.query.id;

        mailmodels.getbyid(id, (err, res) => {
            if (err) {
                response.status(500).send("Error fetching mail data");
            } else {
                response.send(res);
            }
        });
    },
    gettashbyidcontroller(req, response) {
        const id = req.query.id;

        mailmodels.gettrsabyid(id, (err, res) => {
            if (err) {
                response.status(500).send("Error fetching mail data");
            } else {
                response.send(res);
            }
        });
    },
    deletemail(req, response) {
        const id = req.body.id;
        mailmodels.deletemail(id, (err, res) => {
            if (err) {
                response.send(err);
            }
            if (res) {
                response.send(res);
            }
        });
    },
    putid(req, response) {
        const body = {
            id: req.body.id,
            Read: req.body.Read,
        };
        mailmodels.updatemail(body, (error, result) => {
            console.log(result, error, "result");
            if (error) {
                response.status(400).send(error);
            } else {
                response.status(200).send({ data: result });
            }
        });
    },

    gettrashmail(error, callback) {
        mailmodels.trashmail((err, res) => {
            if (err) {
                callback.send(err);
            }
            callback.send(res);
        });
    },
    deletetrashmail(err, callback) {
        mailmodels.deletetrash((err, res) => {
            if (err) {
                callback.send(err);
            }
            if (res) {
                callback.send({ data: "deleted successfully" });
            }
        });
    },
};

module.exports = usermaildata;
