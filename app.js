const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.post("/", async (req, res) => {
    const { from, to, subject, text } = req.body;

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 0,
        secure: false,
        auth: {
            user: "da...@ethereal.email",
            pass: "aJ...",
        },
    });

    const msg = {
        from: `${from}`,
        to: `${to}`,
        subject: `${subject}`,
        text: `${text}`,
    };
    const info = await transporter.sendMail(msg);
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.send("Email Sent!");
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
