export const countUnreadFunc = (notification: any, senderId: any) => {
    return notification.filter((n:any)=> n.isRead === false && n.senderId == senderId);
}