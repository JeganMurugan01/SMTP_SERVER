const express = require("express");
const bodyParser = require("body-parser");
const dbcon = require("./config/dbconfig");
const app = express();
const cors = require("cors");
const router = require("./routes");
const authroute = require("./routes/auth");

const localport = 3002;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());
app.use("/api", router);
app.use("/api/v1", authroute);
dbcon.getConnection((err, res) => {
    if (res) {
        console.log("DB connected successfully");
    }
    if (err) throw err;
});
app.listen(localport, () => console.log(`http://localhost:${localport}`));
