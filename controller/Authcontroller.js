const { Auth } = require("../models/Auth");

const userlogin = {
    userdata(req, response) {
        const body = {
            username: req.body.Username,
            password: req.body.Password,
            mobilenumber: req.body.Mobilenumber,
            mailid: req.body.Email,
            city: req.body.City,
            state: req.body.State,
            pincode: req.body.Pincode,
            Roleid: req.body.Roleid,
        };
        Auth.createnewuser(body, (callback) => {
            response.send(callback);
        });
    },
};

module.exports = { userlogin };
