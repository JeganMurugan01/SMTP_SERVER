const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
function isValidMobileNumber(mobileNumber) {
    const mobileNumberRegex = /^[1-9]\d{9}$/;

    return mobileNumberRegex.test(mobileNumber);
}
function isValidPincode(pincode) {
    const pincodeRegex = /^[1-9][0-9]{5}$/;

    return pincodeRegex.test(pincode);
}
function isStrongPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return passwordRegex.test(password);
}

module.exports = { emailRegexp, isValidMobileNumber, isValidPincode,isStrongPassword};
