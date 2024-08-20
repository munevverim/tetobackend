const express = require('express');
const {
    createEvent,
    getEvents,
    getEventById,
    joinEvent,
} = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createEvent);
router.get('/', authMiddleware, getEvents);
router.get('/:id', authMiddleware, getEventById);
router.post('/:id/join', authMiddleware, joinEvent);

module.exports = router;
