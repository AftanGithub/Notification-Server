const { Notification } = require("../models");



exports.sendNotification = async (req,res)=>{
    try{
        const { receiverId, message } = req.body;
        const senderId = req.user.id; // Retrieving sender id from authenticated user object came from middleware

        const notification = await Notification.create({ senderId, receiverId, message });
        // Emit the notification event to the receiver
        req.io.to(receiverId.toString()).emit('newNotification', {
        senderId,
        message,
        createdAt: notification.createdAt
    });
        res.status(201).json({ message: 'Notification sent', notification });
    }catch(err){
        console.log(err);
        res.status(500).json({message:err?.message});
    }
}


exports.getAllNotifications = async (req,res)=>{
    try{
        const receiverId = req.user.id; // Retrieving sender id from authenticated user object came from middleware
        const notifications = await Notification.findAll({where:{ receiverId}});
        res.status(201).json({ notifications });
    }catch(err){
        console.log(err);
        res.status(500).json({message:err?.message});
    }
}

exports.markNotificationAsRead = async (req,res)=>{
    try{
        const { id } = req.params;
        const notification = await Notification.findOne({ where: { id, receiverId: req.user.id } });
        
        if (!notification) return res.status(404).json({ error: 'Notification not found' });
    
        notification.isRead = true;
        await notification.save();
    
        res.json({ message: 'Notification marked as read', notification });
      } catch (error) {
        res.status(500).json({ error: 'Failed to mark notification as read' });
      }
}