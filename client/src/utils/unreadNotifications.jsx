

export const unreadNotifications = (notification) => {
  return notification.filter((item) => item.isRead === false);
};
