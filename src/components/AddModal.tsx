import {useContext, useState,} from "react";
import {
    Input,
    Button,
  } from "@material-tailwind/react";
// import { UserPlusIcon  } from "@heroicons/react/24/solid";
import { ChatContext } from "../context/ChatContext";

const AddModal = () => {
    const [showModal, setShowModal] = useState(true);
    const {updateAddChatInfo, addChat, addChatInfo} = useContext(ChatContext);
    
    return (
    <>
        {/* <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add
      </button>
      <IconButton variant="text" color="white" onClick={() => setShowModal(true)}>
        <UserPlusIcon className="w-4 h-4"/>
      </IconButton> */}
      {showModal ? (
        <>
          <div 
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add Friend
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <form onSubmit={addChat}> 
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                    <Input size="lg" label="Email" onChange={(e) => updateAddChatInfo({...addChatInfo, codeReferral: e.target.value})}/>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                    >
                        Close
                    </button>
                    {/* <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                    > */}
                        <Button className="mt-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" fullWidth type="submit">
                            Add
                        </Button>
                        
                    {/* </button> */}
                    </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
       ) : null}
    </>
    )
}

export default  AddModal;