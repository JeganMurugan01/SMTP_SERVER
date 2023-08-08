const  jwt  = require("jsonwebtoken");
const { isValidMobileNumber, isValidPincode } = require("../Pageconstants");
const dbcon = require("../config/dbconfig");
const bcrypt = require("bcryptjs");

const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const Auth = {
    createnewuser(req, callback) {
        console.log(req?.mailid, "req");
        if (emailRegexp.test(req?.mailid)) {
            console.log(req.mobilenumber,"req.mobilenumber")
            if (isValidMobileNumber(req.mobilenumber) && req.city.length && isValidPincode(req.pincode) && req.username.length && req?.password?.length) {
                dbcon.query("INSERT INTO Login SET ?", req, (err, res) => {
                    if (err) {
                        console.error(err);
                        callback({ statusCode: 500, data: { Error: "Internal Server Error" } });
                        return;
                    }
                    if (res && res.affectedRows > 0) {
                        callback(null, { statusCode: 201, data: { message: "User created successfully" } });
                        return;
                    } else {
                        callback({ statusCode: 500, data: { Error: "User creation failed" } });
                        return;
                    }
                });
            } else {
                callback({ statusCode: 400, data: { Error: "Invalid input data" } });
            }
        } else {
            callback({ statusCode: 400, data: { Error: "Invalid email format" } });
        }
    },

    Login(req, callback) {
        console.log(req, "Login request");
        dbcon.query("SELECT password ,user_id FROM Login WHERE mailid = ?", req.mailid, (err, res) => {
            console.log(res, "response from database");
            bcrypt.compare(req.password, res[0]?.password, (err, isMatch) => {
                    if(isMatch) {
                        if (err) {
                            callback({ message: "Error executing the query." });
                        } else {
                            if (res && res.length > 0) {
                                callback(null, res);
                            } else {
                                callback({ message: "Incorrect email address or password" });
                            }
                        }
                    }else{
                        callback({ message: "Incorrect email address or password" });
                    }
            })
           
        });
    },
    reftoken(body,callback)
    {
      jwt.verify(body,"Ben10",(err,res)=>{
        if(err)
        {
            callback({err:"Invalid token",});
        }
        if(res)
        {
            console.log(res,"res")
            const accessToken = jwt.sign({ userid: res.userid }, "Ben10", {
                algorithm: "HS256",
                expiresIn: "1h",
            });
            const refreshtoken = jwt.sign({ userid: res.userid }, "Ben10", {
                algorithm: "HS256",
                expiresIn: "1d",
            });
            callback({ accessToken: accessToken, reftoken: refreshtoken});
        }
      })
    }
};

module.exports = { Auth };
