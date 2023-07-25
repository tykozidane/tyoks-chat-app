import { Card } from "@material-tailwind/react";
// import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { countUnreadFunc } from "../../utils/countUnreadMessages";
import useWindowDimensions from "../../hooks/useWindowDimension";


const UserChat = ({chat, user}: any) => {
    const {height, width} = useWindowDimensions();
    let sizeScreen = 0;
  if(width) sizeScreen=width;

    // const {recipientUser} = useFetchRecipientUser(chat, user); 
    const {openMessage, onlineUsers, notifications} = useContext(ChatContext);
    const unreadMessages = countUnreadFunc(notifications, chat?.recipientId);
    // console.log("chat", chat);
    let time = "";
    
    if(chat.message.length > 0) {
        const date = new Date(chat.message[0].createdAt);
    const now = new Date();
    if((date.getDay() - now.getDay()) > 0) {
         time = new Intl.DateTimeFormat(['ban', 'id']).format(date);
    } else {
        if(date.getMinutes() < 10){
            time = `${date.getHours()}:0${date.getMinutes()}`;
        } else {
            time = `${date.getHours()}:${date.getMinutes()}`;
        }
        
    }
    }
    
    
    // console.log("date",(date.getDay() - now.getDay()));
    
    return <>
        <Card className=" m-3 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-4  items-center p-1 hover:bg-sky-700" onClick={() => openMessage({chatId: chat._id, senderId: chat?.recipientId, name: chat?.recipientName, avatar: chat.recipientAvatar})}>
                <div className="sm:row-span-1 max-w-xs">
                  <img
                    className="w-10 h-10 rounded-full m-2"
                    src={chat?.recipientAvatar}
                    alt="ava image"
                  />
                  {onlineUsers?.some((user: any) => user?.userId === chat?.recipientId) ? <>
                  <div className="absolute md:left-10 md:top-9 sm:left-8 sm:top-8 md:w-3 md:h-3 sm:w-2 sm:h-2 left-10 top-10 w-3 h-3 bg-green-500 rounded-full"></div>
                  </> : <>
                  <div className="absolute md:left-10 md:top-9 sm:left-8 sm:top-8 md:w-3 md:h-3 sm:w-2 sm:h-2 left-10 top-10 w-3 h-3 bg-gray-500 rounded-full"></div>
                  </>}
                  
                </div>
                
                <div className=" md:col-span-2 sm:col-span-1 name grid grid-rows-2 sm:pl-0 md:pl-2 col-span-2 ">
                    <div className=" font-semibold">
                        {chat?.recipientName}
                    </div>
                   
                    { chat.message.length > 0 ? (<>
                    <div className=" text-xs">
                        {sizeScreen < 639 ? (<>
                            {chat.message[0].typeMessage == "text" ? `${chat.message[0].text.length > 18 ? `${chat.message[0].text.substring(0, 18)}...` : chat.message[0].text}`: "There is a file"}
                        </>) : (<>
                        {chat.message[0].typeMessage == "text" ? `${chat.message[0].text.length > 10 ? `${chat.message[0].text.substring(0, 10)}...` : chat.message[0].text}`: "There is a file"}
                        </>)}
                        
                    </div>
                    </>) : (<>
                        <div className=" text-sm sm:text-xs">
                            <p className=" truncate">Belum memulai Chat</p>
                    </div>
                    </>)}
                    
                    
                    
                        
                      
                </div>
                <div className=" place-content-end grid grid-rows-2 sm:col-span-1">
                    <div className=" text-sm sm:text-xs mr-2 place-content-end">
                    {time}
                    </div>
                    {unreadMessages.length > 0 ? 
                      (
                        <>
                        <div className=" bg-green-500 w-6 h-6 rounded-full inline-flex items-center justify-center text-xs text-white ">
                        {unreadMessages.length}
                    </div>
                        </>
                     )
                    : ""}
                    
                </div>
              </Card>
    </>
}

export default UserChat;