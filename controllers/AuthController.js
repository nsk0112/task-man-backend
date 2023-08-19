const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const auth = (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            throw Error("Send authentication info in request body");
        }


        db.user.findOne({ where: { 'username': username }, }).then(async user => {
            if (user == null) {
                return res.json({ message: "Invalid Credentials" })
            };
            let validatePassword = await bcrypt.compare(password, user.password);
            console.log(validatePassword);

            if (!validatePassword) {
                return res.json({ message: "Invalid Credentials" })
            }

            else {
                const tokenPayload = {
                    username: user.username,
                    is_admin: user.is_admin
                }
                const accessToken = jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
                console.log(accessToken);
                res.status(200).json({
                    status: 'success',
                    message: 'User Logged In!',
                    data: {
                        accessToken,
                    },
                });
            }
        })

    }
    catch (err) {
        res.json({ message: err.message });
    }
}



module.exports = { auth };
