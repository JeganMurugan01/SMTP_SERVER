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
        };

        async function createTestTransporter() {
            let testAccount = await nodemailer.createTestAccount();
            return nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass,
                },
            });
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
            if (
                emailRegexp.test(maildatareq.from) &&
                emailRegexp.test(maildatareq.to) &&
                emailRegexp.test(maildatareq.cc) &&
                emailRegexp.test(maildatareq.bcc)
            ) {
                const info = await transporter.sendMail(msg);
                console.log("Message sent: %s", info.messageId);
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                const url = nodemailer.getTestMessageUrl(info);
                mailmodels.sendingmail(maildatareq, (res) => {
                    response.send(`Email Sent!\nURL : ${url}\nResponse: ${res}`);
                });
            } else {
                response.status(400).send({error:"Check the given data "});
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to send email.");
        }
    },
    getmaildata(req, callback) {
        mailmodels.getmaildatadb((err, res) => {
            if (err) {
                console.error(err);
                callback.send("Mail fetch error");
            } else {
                callback.send(res);
            }
        });
    },
    getbyidcontroller(req, response) {
        const id = req.query.id;

        mailmodels.getbyid(id, (err, res) => {
            if (err) {
                response.send(err);
            }
            if (res) {
                response.send(res);
            }
        });
    },
    deletemail(req,response){
        const id=req.body.id;
        mailmodels.deletemail(id,(err,res)=>{
            if(err)
            {
                response.status(400).send(err)
            }
            if(res)
            {
                response(res)
            }
        })
    },
    putid(req,response)
    {
        const body={

            id:req.body.id,
            Read:req.body.Read
        }
        mailmodels.updatemail(body, (error, result) => {
            console.log(result,error, "result");
            if (error) {
                response.status(400).send(error);
            } else {
                response.status(200).send({ data: result });
            }
        });
    }
    
    
};

module.exports = usermaildata;
