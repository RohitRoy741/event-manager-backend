const express = require('express');
require('./db/mongoose');

const app = express();
const eventRouter = require('./routers/event');
const userRouter = require('./routers/user');

const cors = require('cors');
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello Event Manager');
});

app.use(userRouter);
app.use(eventRouter);
app.listen(port, () => {
    console.log('Server is running on '+port);
})