const mongoose = require('mongoose');

//const uri = "mongodb://localhost:27017/event-manager-api";
const uri = "mongodb+srv://Rohit:rohitroy@cluster0.stbre.mongodb.net/eventManager?retryWrites=true&w=majority";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected');
}).catch((error) => {
    console.log(error);
})