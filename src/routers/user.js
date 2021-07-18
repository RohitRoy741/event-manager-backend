const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const Event = require('../models/event');
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

//Add RSVP API
router.post('/v1/rsvp/add/:id', auth, async(req, res) => {
    try {
        const user = req.user;
        const event = await Event.findById(req.params.id);
        if(!user.events.includes(event._id)) {
            user.events.push(event._id);
            await user.save();
        }
        if(!event.attendees.includes(user._id)) {
            event.attendees.push(user._id);
            await event.save();
        }
        res.send({user, event});
    }catch(e) {
        res.status(500).send({ error: e });
    }
});

//Remove RSVP API
router.post('/v1/rsvp/remove/:id', auth, async(req, res) => {
    try {
        const user = req.user;
        const event = await Event.findById(req.params.id);
        let flag = false;
        for(let e of user.events) {
            if(e._id.toString() === event._id.toString()) {
                flag = true;
            }
        }
        console.log(flag);
        user.events = user.events.filter((ev) => {
            ev._id.toString() !== event._id.toString();
        });
        await user.save();
        event.attendees = event.attendees.filter((us) => {
            us._id.toString() !== user._id.toString();
        });
        await event.save();
        res.send({user, event});
    }catch(e) {
        console.log(e);
        res.status(500).send({ error: e });
    }
});
//Get Schedule
router.get('/v1/schedule', auth, async(req, res) => {
    try {
        let events = [];
        for(let e of req.user.events) {
            const event = await Event.findById(e._id);
            events.push(event);
        }
        res.send(events);
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }
})
module.exports = router;