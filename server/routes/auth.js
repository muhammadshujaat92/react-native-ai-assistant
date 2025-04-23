require('dotenv').config();
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken")
const bycript = require('bcryptjs');

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ err: "Invalid Cradentials" });

        const emailExist = await User.findOne({ email });
        if (emailExist) return res.status(400).json({ err: "Email is in use" });

        const user = new User({ name, email, password });
        await user.save()

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, process.env.AUTH_SECRETE_KEY);
        return res.status(200).json({ authToken });

    } catch (error) {
        return res.status(500).json({ error: "Something went wrong. Please try again later." });
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ err: "Invalid Cradentials" });

        const loginEmail = await User.findOne({ email });

        if (!loginEmail) return res.status(400).json({ error: "Please try to login with correct credentials", });

        const loginPassword = await bycript.compare(password, loginEmail.password)

        if (!loginPassword) return res.status(400).json({ error: "Please try to login with correct credentials", });

        const data = {
            user: {
                id: loginEmail.id
            }
        }

        const authToken = jwt.sign(data, process.env.AUTH_SECRETE_KEY);
        return res.status(200).json({ authToken });

    } catch (error) {
        return res.status(500).json({ error: "Something went wrong. Please try again later." });
    }
})

module.exports = router;