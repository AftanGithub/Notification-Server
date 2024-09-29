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

//with pagination
exports.getAllNotifications = async (req,res)=>{
    try {
        const userId = req.user.id; // fetching from middleware auth object
        const page = parseInt(req.query.page) || 1; // Default page is 1
        const limit = parseInt(req.query.limit) || 10; // Default limit is 10

        const offset = (page - 1) * limit; // starting index for fetching first record

        // Fetch notifications with pagination
        const { count, rows } = await Notification.findAndCountAll({
            where: { receiverId: userId },
            offset: offset,
            limit: limit,
            order: [['createdAt', 'DESC']], // Fetching notifications in descending order by creation date
        });

        return res.status(200).json({
            notifications: rows,
            total: count,
            page: page,
            totalPages: Math.ceil(count / limit),
        });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching notifications", error });
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


exports.markAllAsRead = async (req,res)=>{
    try {
        const userId = req.user.id;

        // Update all notifications for the logged-in user
        await Notification.update(
            { isRead: true },
            {
                where: {
                    receiverId: userId,
                    isRead: false,
                },
            }
        );

        return res.status(200).json({ message: "All notifications marked as read." });
    } catch (error) {
        return res.status(500).json({ message: "Error marking notifications as read", error });
    }
}