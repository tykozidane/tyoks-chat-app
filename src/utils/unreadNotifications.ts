export const unreadNotificationsFunc = (notification: any) => {
    return notification.filter((n:any)=> n.isRead === false );
}