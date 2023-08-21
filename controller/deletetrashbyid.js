const { trashdeletebyid } = require("../models/deletetrashbyid");

const deletebytrashid = {
    trashbyid(req, callback) {
        const id = req.body.id;
        trashdeletebyid.trashdeleteid(id, (err, res) => {
            if (res) {
                callback.send(res);
            }
            if (err) {
                console.log(err, "errr");
                callback.send(err);
            }
        });
        console.log(req.body.id);
    },
};
module.exports = { deletebytrashid };
