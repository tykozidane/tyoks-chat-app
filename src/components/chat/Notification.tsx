import {
  MenuItem
  } from "@material-tailwind/react";
import { getDetailUser } from "../../hooks/getDetailUser";
import { ChatContext } from "../../context/ChatContext";
import { useContext } from "react";

const Notification = ({data} :any) => {
    const {openMessage} = useContext(ChatContext);
  // console.log("Notif", data);
	let time = "";
	const now = new Date();
    const dataUser = getDetailUser(data.senderId);
    let date = new Date(data.date);

									if(Math.ceil((now.getTime()-date.getTime())/(60*60*24*1000)) <  1 ) {
										time = new Intl.DateTimeFormat(['ban', 'id'], {year: "numeric",
										month: "numeric",
										day: "numeric", 
										hour: "numeric",
										minute: "numeric",}).format(date);
								   } else if(date.getDay() != now.getDay()){
									time = `yesterday ${date.getHours()}:${date.getMinutes()}`;
								   }
								   else if((now.getHours()-date.getHours()) > 0 ){
										time = `${date.getHours()}:${date.getMinutes()}`;
								   }
								   else {
									   time = `${(now.getMinutes()-date.getMinutes())} min ago`;
								   }
    return (
        
                  <MenuItem onClick={() => openMessage({chatId: data.chatId, senderId: data.senderId, name: dataUser.detailUser?.name})} className="">
                  <div className="sm:flex sm:gap-1">
                    <div className="sm:flex-1">
                        {dataUser.detailUser?.name} 
                    </div>
                    <div className="sm:flex-1">
                      {data.typeMessage == "text" ? "sent you a message" : null}
                      {data.typeMessage == "image" ? "sent you a image" : null}
                         
                    </div>
                    <div className="">
                        {time}
                    </div>
                  </div>
                  
                  </MenuItem>
    
    )
};

export default Notification;