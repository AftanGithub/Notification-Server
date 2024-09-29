const express = require('express');
const NotificationController = require('../controllers/notifications.controller');
const { authenticateUser } = require('../middlewares/auth');
const router = express.Router();


router.post('/send',authenticateUser,NotificationController.sendNotification);
router.get('/',authenticateUser,NotificationController.getAllNotifications);
router.put('/:id/read',authenticateUser,NotificationController.markNotificationAsRead)

module.exports = router;