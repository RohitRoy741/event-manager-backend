const mongoose = require('mongoose');

const Event = mongoose.model('event', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    city : {
        type: String,
        required: true,
        trim: true 
    },
    date: {
        type: Date,
        required: true,
        validator(value) {
            if(value < new Date()) {
                throw new Error('Please enter a future event!');
            }
        }
    },
    attendees: [{
        attendee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
});

module.exports = Event;