const express = require('express');
require('./db/mongoose');
const Event = require('./models/event');

const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello Event Manager');
});
app.post('/events', async (req, res) => {
    const event = new Event(req.body);
    try {
        await event.save();
        res.send(event);
    } catch(e) {
        res.status(400).send(error);
    }
});
app.get('/events', async (req,res) => {
    try {
        const events = await Event.find({});
        res.send(events);
    } catch(e) {
        res.status(400).send(e);
    }
});
app.patch('/events/:id', async (req,res) => {
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
        await event.save();
        res.send(event);
    }catch(e) {
        res.status(500).send();
    }
});
app.delete('/events/:id', async (req,res) => {
    try {
        const event = await Event.findOne({ _id: req.params.id });
        await event.remove();
        res.send(event);
    } catch(e) {
        res.status(500).send(e);
    }
});
app.listen(port, () => {
    console.log('Server is running on '+port);
})