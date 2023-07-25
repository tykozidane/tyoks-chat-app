import { EllipsisVerticalIcon, ArrowUturnLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { IconButton, Menu, MenuHandler, MenuItem, MenuList, Button } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";

const BagdeInfoChat = ({ user }: any) => {
  const {closeMessage} = useContext(ChatContext); console.log("Badge", user);
  const [showDeleteMessageModal, setShowDeleteMessageModal] = useState(false);
  const [showUnfriendModal, setShowUnfriendModal] = useState(false);
  const {deleteAllMessagesFunc, deleteAllMessagesLoading, unfriendFunc, unfriendLoading} = useContext(ChatContext);
  return (
    <>
      <div className=" flex items-center place-self-center md:pt-4 py-2">
        <div className="flex-none mx-3">
          <IconButton variant="text" color="white" onClick={()=> closeMessage()}>
            <ArrowUturnLeftIcon className="h-5 w-5" />
          </IconButton>
        </div>
        <div className="flex-none">
          <img
            className="h-10 w-10 rounded-full m-2"
            src={user?.interlucutorsAvatar}
            alt="ava image"
          />
        </div>
        <div className=" flex-none text-white">
          <h5 className="">
            {user.interlucutorsName}
          </h5>
        </div>
        <div className="flex-1 flex justify-end">
          <div className=" md:mr-3">
            <Menu>
              <MenuHandler>
                <IconButton variant="text" color="white">
              <EllipsisVerticalIcon className="h-5 w-5" />
            </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem>
                  <a className=" text-red-500" onClick={() => {setShowDeleteMessageModal(true)}}>Delete Message</a>
                </MenuItem>
                <MenuItem>
                  <a className=" text-red-500" onClick={()=> {setShowUnfriendModal(true)}}>Unfriend this Person</a>
                </MenuItem>
              </MenuList>
            </Menu>
            
          </div>
        </div>
      </div>
      {showDeleteMessageModal ? 
        (<>
        <div 
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Delete This Messages
                  </h3>
                      <IconButton onClick={() => setShowDeleteMessageModal(false)} className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                        <XMarkIcon className="h-5 w-5"/>
                      </IconButton>
                    
                </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      Are Your Sure Want to delete all of messages from {user.interlucutorsName}
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    
                    <Button className="mt-6 text-red-500 bg-transparent uppercase" fullWidth  onClick={() => setShowDeleteMessageModal(false)}>
                            Close
                        </Button>
                    {/* <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                    > */}
                        <Button className="mt-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 uppercase" fullWidth onClick={()=> {deleteAllMessagesFunc({chatId: user._id}); setShowDeleteMessageModal(false);}}>
                          {/* {addChatLoading ? "Loading Add" : "ADD" } */}
                          {
                            deleteAllMessagesLoading ? (<>
                            <div role="status">
                                <svg aria-hidden="true" className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                            </>) : (<>
                            Delete
                            </>)
                          }
                        </Button>
                        
                    {/* </button> */}
                    </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div></>)
          : null }
          {showUnfriendModal ? 
        (<>
        <div 
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Unfriend 
                  </h3>
                      <IconButton onClick={() => setShowUnfriendModal(false)} className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                        <XMarkIcon className="h-5 w-5"/>
                      </IconButton>
                    
                </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      Are Your Sure Want to unfriend {user.interlucutorsName}
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    
                    <Button className="mt-6 text-red-500 bg-transparent uppercase" fullWidth  onClick={() => setShowUnfriendModal(false)}>
                            Close
                        </Button>
                    {/* <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                    > */}
                        <Button className="mt-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 uppercase" fullWidth onClick={()=> {unfriendFunc({chatId: user._id}); setShowUnfriendModal(false);}}>
                          {/* {addChatLoading ? "Loading Add" : "ADD" } */}
                          {
                            unfriendLoading ? (<>
                            <div role="status">
                                <svg aria-hidden="true" className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                            </>) : (<>
                            Unfriend
                            </>)
                          }
                        </Button>
                        
                    {/* </button> */}
                    </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div></>)
          : null }
    </>
  );
};

export default BagdeInfoChat;
