const { emailRegexp, isValidMobileNumber, isValidPincode, isStrongPassword } = require("../Pageconstants");

const Auth = {
    createnewuser(req, callback) {
        console.log(req);
        if (isStrongPassword(req.password)) {
            if (
                emailRegexp.test(req?.mailid) &&
                isValidMobileNumber(req.mobilenumber) &&
                req.city.length &&
                isValidPincode(req.pincode) &&
                req.username.length &&
                req.password.length
            ) {
                callback("Successfully created");
            } else {
                callback("Error creating");
            }
        } else {
            callback("Password must be strong");
        }
    },
};

module.exports = { Auth };
