const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Auth } = require("../models/Auth");
const userlogin = {
    userdata(req, response) {
        console.log(req);
        bcrypt.hash(req.body.Password, 10, (err, hashedPassword) => {
            if (err) {
                console.error("Error hashing password:", err);
                return;
            }
            const body = {
                username: req.body.Username,
                Firstname: req.body.Firstname,
                Lastname: req.body.Lastname,
                password: hashedPassword,
                mobilenumber: req.body.Mobilenumber,
                mailid: req.body.Email,
                city: req.body.City,
                state: req.body.State,
                pincode: req.body.Pincode,
                Roleid: req.body.Roleid,
            };

            Auth.createnewuser(body, (error, callback) => {
                if (callback) {
                    response.status(200).send(callback);
                }
                if (error) {
                    response.status(400).send(error);
                }
            });
        });
    },
    Login(req, response) {
        console.log(req);
        const body = {
            mailid: req.body.Email,
            password: req.body.Password,
        };
        Auth.Login(body, (err, dbResponse) => {
            if (err) {
                response.status(400).json({ status: 400, error: err });
            } else if (dbResponse && dbResponse.length > 0) {
                bcrypt.compare(body.password, dbResponse[0]?.password, (err, isMatch) => {
                    if (isMatch) {
                        const accessToken = jwt.sign({ userid: dbResponse[0]?.user_id }, "Ben10", {
                            algorithm: "HS256",
                            expiresIn: "1h",
                        });
                        const refreshtoken = jwt.sign({ userid: dbResponse[0]?.user_id }, "Ben10", {
                            algorithm: "HS256",
                            expiresIn: "1d",
                        });
                        response.json({ accessToken: accessToken, reftoken: refreshtoken, userid: dbResponse[0].user_id });
                    } else {
                        console.log("error");
                        response.status(401).json({ status: 401, error: "Authentication failed" });
                    }
                });
            } else {
                console.log("error");
                response.status(401).json({ status: 401, error: "User not found" });
            }
        });
    },
    refreshtoken(req, response) {
        const token = req.body.refreshtoken;
        Auth.reftoken(token, (res, err) => {
            if (res) {
                response.status(200).send(res);
            }
            if (err) {
                response.state(400).send({ err: "Something went wrong" });
            }
        });
    },
};

module.exports = { userlogin };
