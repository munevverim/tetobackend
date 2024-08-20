const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    const { title, description, location, startTime, endTime } = req.body;

    try {
        const event = new Event({
            title,
            description,
            location,
            startTime,
            endTime,
            createdBy: req.user.id,
        });

        await event.save();

        res.status(201).json(event);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('createdBy', 'username');
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('createdBy', 'username');
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.joinEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (!event.participants.includes(req.user.id)) {
            event.participants.push(req.user.id);
            await event.save();
        }

        res.json(event);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
