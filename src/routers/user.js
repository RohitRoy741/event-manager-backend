const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');

//Signup API
router.post('/v1/users', async (req,res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch(e) {
        res.status(400).send(e);
    }
});

//Login API
router.post('/v1/users/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password);
        const token = await user.generateAuthToken();
        console.log(token);
        res.send({ user, token });
    } catch(e) {
        res.status(400).send(e);
    }
});

//API to get the data of all users
router.get('/v1/users', auth,async (req,res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch(e) {
        res.status(400).send(e);
    }
});

//API to get user's profile
router.get('/v1/users/me', auth, async (req, res) => {
    res.send(req.user);
});

//Logout API
router.post('/v1/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        console.log('Logging Out!');
        res.status(200).send();
    } catch(e) {
        res.status(500).send(e);
    }
});

//API to logout of all the sessions
router.post('/v1/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send();
    } catch(e) {
        res.status(500).send(e);
    }
});

module.exports = router;