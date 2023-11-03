const userDB = require("../model/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

exports.login = async (req, res) => {
    const phoneNo = req.body.phoneNo;
    const password = req.body.password;

    try {
        let data = await userDB.findOne({
            where: {
                phoneNo: phoneNo
            }
        })

        if (data) {
            const checkLogin = await bcrypt.compare(password, data.password)
            if (checkLogin) {
                res.status(201).json({ result: 'success', token: generateAccessToken(data.id) });
            }
            else {
                res.status(401).json({ result: 'Failed' });
            }
        }
        else {
            res.status(404).json({ result: 'notExist' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ result: 'error' })
    }
}

function generateAccessToken(id) {
    return jwt.sign({ userid: id }, process.env.SECRETKEY);
}