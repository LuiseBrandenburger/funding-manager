const express = require("express");
const auth = express.Router();
const { validateEmail } = require("../utils/helpers");
const { hash } = require("../utils/bc");
const { compare } = require("../utils/bc");

const { getUserForLogin, registerUser } = require("../sql/db");

/*************************** ROUTES ***************************/

auth.get("/api/user-id", function (req, res) {
    res.json({
        userId: req.session.userId,
    });
});

auth.post("/api/login", (req, res) => {

    const data = req.body;
    const pw = data.password;

    getUserForLogin(data.email)
        .then(({ rows }) => {
            compare(pw, rows[0].password)
                .then((match) => {
                    if (match) {
                        req.session.userId = rows[0].id;
                        res.json({ success: true });
                    } else {
                        console.log("Error in Match");
                        res.json({ success: false });
                    }
                })
                .catch((err) => {
                    console.log("password error", err);
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log("error finding user: ", err);
            res.json({ success: false });
        });
});

auth.post("/api/register", (req, res) => {

    const data = req.body;
    const pw = data.password;

    const mailError = validateEmail(data.email);

    if (mailError) {
        res.json({ error: true });
    } else {
 
        hash(pw)
            .then((hashedPw) => {

                registerUser(data.first, data.last, data.email, hashedPw)

                    .then(({ rows }) => {
                        req.session.userId = rows[0].id;
                        res.json({ success: true });
                    })
                    .catch((err) => {
                        console.log("error adding user: ", err);
                        res.json({ success: false });
                    });
            })
            .catch((err) => {
                console.log("err in hash", err);
                res.json({ error: true });
            });
    }
});

auth.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

/*************************** EXPORT ***************************/

module.exports = auth;
