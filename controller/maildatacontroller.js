const nodemailer = require("nodemailer");
const { mailmodels } = require("../models/Maildatamodels");

const usermaildata = {
    async maildata(req, response) {
        const maildatareq = {
            from: req.body.from,
            to: req.body.to,
            subject: req.body.subject,
            cc: req.body.cc,
            bcc: req.body.bcc,
            text: req.body.text,
            html: req.body.html,
            title:req.body.title,
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
                text:maildatareq.text,
            };

            const info = await transporter.sendMail(msg);
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            const url = nodemailer.getTestMessageUrl(info);

            mailmodels.sendingmail(maildatareq, (res) => {
                response.send(`Email Sent!\nURL : ${url}\nResponse: ${res}`);
            });
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to send email.");
        }
    },
    getmaildata(req,callback) { 
        mailmodels.getmaildatadb((err, res) => {
            if (err) {
              console.error(err);
              callback.send("Mail fetch error");
            } else {
              callback.send(res);
            }
          });
    },
    getbyidcontroller(req,response){
        const id = req.query.id;
        
        mailmodels.getbyid(id,(err,res)=>{
            if(err)
            {
                response.send(err)
            }
            if(res)
            {
                response.send(res)
            }
        })
    }
};

module.exports = usermaildata;
