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
app.post('/events', (req, res) => {
    const event = new Event(req.body);
    event.save().then(() => {
        console.log(event);
        res.send(event);
    }).catch((error) => {
        console.log(error);
        res.status(400).send(error);
    });
});
app.get('/events', (req,res) => {
    Event.find({}).then((events) => {
        res.send(events);
    }).catch((error) => {
        res.status(400).send(error);
    })
});

app.listen(port, () => {
    console.log('Server is running on '+port);
})