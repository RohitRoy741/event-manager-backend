const express = require('express');
const router = new express.Router();
const Event = require('../models/event');
const auth = require('../middleware/auth');

//API to post the events
router.post('/events', async (req, res) => {
    console.log(req.body);
    const event = new Event(req.body);
    console.log(event);
    try {
        await event.save();
        res.send(event);
    } catch(e) {
        res.status(400).send(error);
    }
});

//API to read the events
router.get('/events', async (req,res) => {
    try {
        const events = await Event.find({});
        res.send(events);
    } catch(e) {
        res.status(400).send(e);
    }
});

//API to update the events
router.patch('/events/:id', async (req,res) => {
    const allowedUpdates = ['name', 'city', 'company', 'date'];
    const updates = Object.keys(req.body);
    const valid = updates.every((update) => allowedUpdates.includes(update));
    if(!valid) {
        return res.status(400).send('Invalid Update');
    }
    try {
        const event = await Event.findOne({ _id: req.params.id });
        if(!event) {
            res.status(404).send();
        }
        updates.forEach((update) => event[update] = req.body[update]);
        console.log(event);
        await event.save();
        res.send(event);
    }catch(e) {
        res.status(500).send();
    }
});

//API to delete the events
router.delete('/events/:id', async (req,res) => {
    try {
        const event = await Event.findOne({ _id: req.params.id });
        await event.remove();
        res.send(event);
    } catch(e) {
        res.status(500).send(e);
    }
});

module.exports = router;