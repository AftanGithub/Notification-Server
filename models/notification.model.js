
module.exports = (sequelize, Sequelize) => {
    const Notification = sequelize.define("notifications", {
        senderId: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          receiverId: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          message: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              len: [1, 255]
            }
          },
          isRead: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
          }
    });
  
    return Notification;
  };