const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
    const { receiverId, content } = req.body;

    try {
        const message = new Message({
            sender: req.user.id,
            receiver: receiverId,
            content,
        });

        await message.save();

        res.status(201).json(message);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.user.id },
                { receiver: req.user.id },
            ],
        }).populate('sender receiver', 'username');

        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
