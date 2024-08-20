const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/auth');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = new User({ username, email, password });
        await user.save();

        const payload = {
            id: user._id,
        };

        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpire });

        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = {
            id: user._id,
        };

        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpire });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
