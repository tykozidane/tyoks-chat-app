// import { useContext } from "react";
// import { ChatContext } from "../context/ChatContext";
import { useRef, useEffect, useState } from "react";
import chatLogo from "../../assets/chatingLogo.png";
import {Spinner} from "@material-tailwind/react"

const MessageBox = ({ message, user, recipient }: any) => {
  console.log("messageBox", user);
  const now = new Date();
  let time = "";
  const scroll = useRef<null | HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  // Attach the scroll listener to the div
  useEffect(() => {
    
      scroll.current?.scrollIntoView({ behavior: "smooth" });
    
  }, [message]);
  useEffect(() => {
    // console.log("")
    setTimeout(()=> {
      setIsLoading(true);
      scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, 1000)
    
  }, []);
  
  return (
    <>
    
      <div className="flex flex-col items-center justify-center h-full w-full">
        {isLoading === false ? (<>
      <div 
            className="justify-center items-center flex  fixed z-50 outline-none focus:outline-none "
          >
        <Spinner className=" h-36 w-36 text-blue-500/10 z-50" />
        </div>
        </>) : null}
        
        {/* <!-- Component Start --> */}
        {message?.length > 0 ? (
          <>
            <div className="flex flex-col flex-grow w-full overflow-hidden">
              <div className="flex flex-col flex-grow h-0 sm:p-4 overflow-auto">
                {message?.map((onemessage: any, index: any) => {
                  let date = new Date(onemessage.createdAt);

                  if (Math.ceil((now.getTime() - date.getTime()) / (60 * 60 * 24 * 1000)) < 1) {
                    time = new Intl.DateTimeFormat(["ban", "id"], {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    }).format(date);
                  } else if (date.getDay() != now.getDay()) {
                    time = `yesterday ${date.getHours()}:${date.getMinutes()}`;
                  } else if (now.getHours() - date.getHours() > 0) {
                    time = `${date.getHours()}:${date.getMinutes()}`;
                  } else {
                    time = `${now.getMinutes() - date.getMinutes()} min ago`;
                  }
                  return (
                    <div key={index} ref={scroll}>
                      {onemessage?.senderId != user._id ? (
                        <>
                          <div className="flex w-full mt-2 space-x-3 max-w-xs ">
                          <img
            className="h-10 w-10 rounded-full m-2"
            src={recipient.interlucutorsAvatar}
            alt="ava image"
          />
                            <div>
                              <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg max-w-md hyphenate">
                                {onemessage.typeMessage == "text" ? (
                                  <>
                                    <p className="text-sm">{`${onemessage.text}`}</p>
                                  </>
                                ) : null}
                                {onemessage.typeMessage == "image" ? (
                                  <>
                                    <img
                                      className=" w-50 h-50 p-1 rounded-lg object-contain"
                                      src={onemessage.text}
                                      alt="ava image"
                                    />
                                  </>
                                ) : null}
                              </div>
                              <span className="text-xs text-gray-500 leading-none">{time}</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                            <div className="">
                              <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg max-w-md hyphenate">
                                {onemessage.typeMessage == "text" ? (
                                  <>
                                    <div className="text-sm whitespace-pre-wrap">{onemessage.text}</div>
                                    
                                  </>
                                ) : null}
                                {onemessage.typeMessage == "image" ? (
                                  <>
                                    <img
                                      className=" w-50 h-50 p-1 rounded-lg object-contain"
                                      src={onemessage.text}
                                      alt="ava image"
                                    />
                                  </>
                                ) : null}
                              </div>
                              <div className=" text-right">
                                <span className="text-xs text-gray-500 leading-none">{time}</span>
                              </div>
                              
                            </div>
                            {/* <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div> */}
                            <img
            className="h-10 w-10 rounded-full flex-shrink-0"
            src={user.avatar}
            alt="ava image"
          />
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className=" grayscale-50">
              <img className=" w-80 p-1" src={chatLogo} alt="ava image" />
            </div>
            <div className="text-center text-white">Lets start send a message</div>

            {/* <!-- Component End  --> */}
          </>
        )}
      </div>
    </>
  );
};

export default MessageBox;
