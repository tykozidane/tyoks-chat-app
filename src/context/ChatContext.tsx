import React, { createContext, useCallback, useState, useEffect } from "react";
import { baseUrl, postRequest } from "../utils/service";
import { io } from "socket.io-client";
import { Socket } from 'socket.io-client';


type ChatContextProviderType = {
    children: React.ReactNode;
    datauser: {
        _id: string;
        name: string;
        email: string;
        token: string;
        codereferral: string;
    };
  };

type AddChatType = {
    codeReferral: any;
};

// type AddMessageType = {
//     text: any;
// }

type ChatType = {
    _id: any;
    interlocutorsId: any;
    interlucutorsName: any;
    interlucutorsAvatar: any;
}

// type NotificationType = {
//     senderId: String;
//     isRead: false;
//     date: any;
//   }

export type ChatContextType = {
    userChats: any;
        isUserChatsLoading: any;
        userChatsError: any;
        updateAddChatInfo: any;
        addChat: any;
        errorAddChat: any;
        addChatLoading: any;
        addChatInfo: any;
        addMessage: any;
        messageChat: any;
        addMessageLoading: any;
        errorAddMessage: any;
        updateAddMessageInfo: any;
        addMessageInfo: any;
        recentChat: any;
        openMessageLoading:any ;
        openMessageError : any;
        openMessage: any;
        closeMessage: any;
        onlineUsers: any;
        notifications: any;
        deleteAllMessagesFunc: any;
        deleteAllMessagesLoading: any;
        errorDeleteAllMessages: any;
        unfriendFunc: any;
        unfriendLoading: any;
        errorUnfriend: any;
  };

export const ChatContext = createContext({} as ChatContextType);

export const ChatContextProvider = ({ children, datauser }: ChatContextProviderType) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [addChatInfo, setAddChatInfo] = useState<AddChatType>({
        codeReferral: null
    });
    const [errorAddChat, setErrorAddChat] = useState(null);
    const [addChatLoading, setAddChatLoading] = useState(false);
    const [recentChat, setRecentChat] = useState<ChatType | null>();
    const [messageChat, setMessageChat] = useState<any>([]);
    const [newMessage, setNewMessage] = useState(Object);
    const [addMessageInfo, setAddMessageInfo] = useState("");
    const [errorAddMessage, setErrorAddMessage] = useState(null);
    const [addMessageLoading, setAddMessageLoading] = useState(false);
    const [openMessageLoading, setOpenMessageLoading] = useState(false);
    const [openMessageError, setOpenMessageError] = useState(null);
    const [socket, setSocket] = useState<Socket>();
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [notifications, setNotifications] = useState<any>([]);
    const [deleteAllMessagesLoading, setDeleteAllMessagesLoading] = useState(false);
    const [errorDeleteAllMessages, setErrorDeleteAllMessages] = useState(null);
    const [unfriendLoading, setUnfriendLoading] = useState(false);
    const [errorUnfriend, setErrorUnfriend] = useState(null);

    // console.log("userChat", datauser);
    // console.log("RecentChat", recentChat);
    // console.log("AddMessage", addMessageInfo); 
    // const needUser = localStorage.getItem("User");
    
     let userId = "";
    if(datauser){userId = datauser._id;};
    
   useEffect(()=> {
    const newSocket = io("http://localhost:3001");
    if(newSocket) setSocket(newSocket);
    

    return () => {
        newSocket?.disconnect()
    }
   },[datauser])

   //add online users
   useEffect(()=>{
    if(socket===null) return;
    if(userId) socket?.emit("addNewUser", userId );
    socket?.on("getOnlineUsers", (res)=>{
        setOnlineUsers(res);
    });

    return () => {
        socket?.off("getOnlineUsers");
    };
   }, [socket])

   //send message
   useEffect(()=>{
    if(socket===null) return;
    const recipientId = recentChat?.interlocutorsId;
    socket?.emit("sendMessage", {...newMessage, recipientId})
   }, [newMessage]);

   //receive message and Notification
   useEffect(()=> {
    if(socket === null) return;
    socket?.on("getMessage", (res)=> {
        if(recentChat?._id !== res.chatId) return;

        setMessageChat((prev: any) => [...prev, res]);
    });

    socket?.on("getNotification", (res) => {
        let isChatOpen = false;
        // const notif = notifications
        if(recentChat?.interlocutorsId === res.senderId){
         isChatOpen = true;
        }
        if(isChatOpen){
            setNotifications((notifications: any)=> [{...res, isRead: true},...notifications]);
        } else {
            setNotifications((notifications: any)=> [res, ...notifications]);
        }
        
        // setNotifications([res, notifications]);
        
    });
    
    return () => {
        socket?.off("getMessage");
        socket?.off("getNotification");
    }
   },[socket, newMessage]);

const getUserChats =async () => {
            if(datauser?._id){
                setIsUserChatsLoading(true);
                const response = await postRequest(`${baseUrl}/chats/find-user-chat`, JSON.stringify({userId: userId}));
                setIsUserChatsLoading(false);
                if(response.error){
                    return setUserChatsError(response);
                }
                // const newResponse = response.map(async (e:any)=> {
                //     const recipientId = e.members.find((id:any) => id !==datauser?._id);
                //     const dataRecipient =  await postRequest(`${baseUrl}/users/find/${recipientId}`, JSON.stringify({}) );
                //     if(dataRecipient) return {...e, name: dataRecipient.name, recipientId: recipientId};
                    
                // })                
                setUserChats(response);
            }
        }

    useEffect(() => {
        
        getUserChats();
        // console.log("response",userChats);
    }, [messageChat, datauser, notifications]);

    // useEffect(() => {
    //     const getRecentChat = localStorage.getItem("RecentChat");
    //     if(getRecentChat) {
    //     const jsonRecentChat = JSON.parse(getRecentChat);
    //     console.log("localChat", jsonRecentChat);
    //         setRecentChat(jsonRecentChat);
    //         openMessage({chatId: jsonRecentChat._id, senderId: jsonRecentChat.interlocutorsId, name: jsonRecentChat.interlocutorsName})
    //     };
    // }, []);

    const updateAddChatInfo = useCallback((info:any) => {
        setAddChatInfo(info);
    }, []);
    
    const updateAddMessageInfo = useCallback((info: any) => {
        setAddMessageInfo(info);
    }, []);

    const addChat = useCallback(async(e:any)=> {
        e.preventDefault();
        setAddChatLoading(true);
        const response = await postRequest(`${baseUrl}/chats/create-chat-by-referral-code`, JSON.stringify({firstId: userId, codeReferral: addChatInfo.codeReferral}));
        

        if(response.error) return setErrorAddChat(response);

        const newUserChats = await postRequest(`${baseUrl}/chats/find-user-chat`, JSON.stringify({userId: userId}));
        setIsUserChatsLoading(false);
        if(response.error){
            return setUserChatsError(response);
        }
        setAddChatLoading(false);
        // console.log("Add Chat", response);
        setUserChats(newUserChats);
        // setUserChats((prev: any) => [...prev, response]);
    }, [addChatInfo]);

    const addMessage =  useCallback(async({chatId, senderId, name, text, typeMessage}: any) => {
        setAddMessageLoading(true);
        if(!text) return console.log("ga kekirim", text);
        const response = await postRequest(`${baseUrl}/messages/create-message`, JSON.stringify({chatId: chatId, senderId: senderId, text: text, typeMessage: typeMessage}));

        if(response.error) return setErrorAddMessage(response);

        // const newresponse = await postRequest(`${baseUrl}/messages/get-message`, JSON.stringify({chatId: chatId}));
        // console.log("message", response);
        // if(response.error) return setOpenMessageError(response);
        setAddMessageLoading(false);
        setNewMessage(response);
        // setMessageChat(null);
        setMessageChat((prev: any) => [...prev, response]);
        // setAddMessageInfo({text: ""});
        console.log("message", response);
        // openMessage({chatId: chatId, senderId: senderId, name: name});
        setAddMessageInfo("");
    }, []);

    const openMessage = useCallback(async({chatId, senderId, name, avatar}: any) => {
        setMessageChat(null);
        setOpenMessageLoading(true);
        const response = await postRequest(`${baseUrl}/messages/get-message`, JSON.stringify({chatId: chatId}));
        console.log("Open message", name);
        if(response.error) return setOpenMessageError(response);
        setOpenMessageLoading(false);

        localStorage.setItem("RecentChat", JSON.stringify({_id: chatId, interlocutorsId: senderId, interlucutorsName: name, interlucutorsAvatar: avatar}));
        markNotificationIsRead(notifications, senderId);
        setMessageChat(response);
        setRecentChat({_id: chatId, interlocutorsId: senderId, interlucutorsName: name, interlucutorsAvatar: avatar})
    }, []);

    const closeMessage = useCallback(async()=> {
        localStorage.removeItem("RecentChat");
        setRecentChat(null);
        setMessageChat(null);
    },[]);

    const markNotificationIsRead = useCallback((notifications: any, senderId: any)=> {
        const mNotifications = notifications.map((el:any) => {
            if(el.senderId == senderId){
                return {...el, isRead:true};
            } else {
                return el;
            }
        });
        setNotifications(mNotifications);
    }, []);

    const deleteAllMessagesFunc = useCallback(async ({chatId}: any) => {
        setDeleteAllMessagesLoading(true);
        // console.log("chatId", chatId);
        const deleteM = await postRequest(`${baseUrl}/messages/delete-message`, JSON.stringify({chatId: chatId}));
        setDeleteAllMessagesLoading(false);
        if(deleteM.error) return setErrorDeleteAllMessages(deleteM);
        setErrorDeleteAllMessages(null);
        closeMessage();
    },[]);

    const unfriendFunc = useCallback(async ({chatId} : any) => {
        setUnfriendLoading(true);
        // console.log("chatId", chatId);
        deleteAllMessagesFunc({chatId: chatId});
        const response = await postRequest(`${baseUrl}/chats/delete-chat`, JSON.stringify({chatId: chatId}));
        setUnfriendLoading(false);
        if(response.error) return setErrorUnfriend(response);
        setErrorUnfriend(null);
        closeMessage();
        getUserChats();
    },[])

    return <ChatContext.Provider value = {{
        userChats,
        isUserChatsLoading,
        userChatsError,
        updateAddChatInfo,
        addChat,
        errorAddChat,
        addChatLoading,
        addChatInfo,
        addMessage,
        updateAddMessageInfo,
        addMessageLoading,
        errorAddMessage,
        messageChat,
        addMessageInfo,
        recentChat,
        openMessageError,
        openMessageLoading,
        openMessage,
        closeMessage,
        onlineUsers,
        notifications,
        deleteAllMessagesFunc,
        deleteAllMessagesLoading,
        errorDeleteAllMessages,
        unfriendFunc,
        unfriendLoading,
        errorUnfriend
    }}>
        {children}
    </ChatContext.Provider>

  };