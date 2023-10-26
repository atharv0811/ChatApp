const userDB = require("../model/userModel");
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phoneNo = req.body.phoneNo;
    const passwordInput = req.body.password;
    try {
        const password = await bcrypt.hash(passwordInput, 10);
        await userDB.create({
            name: name,
            email: email,
            phoneNo: phoneNo,
            password: password
        });
        res.status(201).json({ result: 'success' })
    } catch (err) {
        console.log(err)
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.json({ result: 'exist' });
        } else {
            res.json({ result: 'error' });
        }
    }
}

exports.login = (req, res) => {

}