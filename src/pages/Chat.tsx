import { Input, IconButton, Button, Textarea } from "@material-tailwind/react";
import { PhotoIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import ImageGirl from "../assets/hijab_work-removebg-preview.png";
import BagdeInfoChat from "../components/chat/BagdeInfoChat";
import MessageBox from "../components/chat/MessageBox";
// import NavBar from "../components/NavBar";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import useWindowDimensions from "../hooks/useWindowDimension";
const Chat = () => {
  const { user } = useContext(AuthContext);
  const {
    userChats,
    isUserChatsLoading,
    messageChat,
    addMessage,
    updateAddMessageInfo,
    addMessageInfo,
    recentChat,
    errorAddMessage,
  } = useContext(ChatContext);
  const { height, width } = useWindowDimensions();
  let sizeScreen = 0;
  if (width) sizeScreen = width;
  // console.log("Size", width)
  const [filteredList, setFilteredList] = useState<String>("");
  const [errorFile, setErrorFile] = useState<any>();
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<any>();
  const [beforeUpload, setBeforeUpload] = useState<string | ArrayBuffer | null>();
  function handleChange(e: any) {
    const MAX_FILE_SIZE = 5120; // 5MB
    if (e[0].size / 1024 > MAX_FILE_SIZE) {
      setErrorFile("Size File more than 5 mb !!!");
      return;
    }
    // Checking if the file type is allowed or not
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
    if (!allowedTypes.includes(e[0].type)) {
      setErrorFile("Only JPEG, JPG, PNG, and GIF images are allowed.");
      return;
    }
    setFile(e[0]);
    convertToBase64(e);
  }

  function convertToBase64(e: any) {
    // console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e[0]);
    reader.onload = () => {
      if (reader.result) setBeforeUpload(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error ", error);
    };
  }
  
  const uploadImage = () => {
    if (file == null) return;
    const imageRef = ref(
      storage,
      `images/tyok-chat-app-${recentChat.interlucutorsName + "-" + new Date().getTime()}`
    );
    uploadBytes(imageRef, file).then((res) => {
      getDownloadURL(res.ref)
        .then((url) => {
          // console.log("url", url);
          addMessage({
            chatId: recentChat._id,
            senderId: user._id,
            name: recentChat.name,
            text: url,
            typeMessage: "image",
          });
          setShowModal(false);
          setBeforeUpload("");
          setErrorFile(null);
        })
        .catch((err) => {
          console.log("Error url", err);
        });
    });
  };

  return (
    <>
      {sizeScreen >= 639 ? (
        <>
          <div className=" lg:mx-10   my-3  grid sm:grid-rows-6 sm:grid-cols-6 md:grid-cols-4 rounded-lg sm:gap-2 gap-y-1 sm: mx-3 h-full">
            {/* User List Chat */}
            <div className="sm:row-span-6 md:col-span-1 sm:col-span-2 rounded-lg sm:bg-gradient-to-r grid md:grid-rows-[50px_minmax(200px,_1fr)_50px] sm:grid-rows-[50px_minmax(200px,_1fr)_50px] grid-rows-4 sm:from-indigo-500 sm:to-purple-500 bg-gradient-to-r from-purple-500 to-pink-500">
              <>
                <div className=" text-white md:mx-3 sm:mt-3 sm:mx-2">
                  <input
                    type="search"
                    onChange={(e: any) => setFilteredList(e.target.value)}
                    placeholder="Search here ..."
                    className=" max-h-10 peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200  !min-w-[50px]  focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20  bg-white shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 "
                  ></input>
                  <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500 hidden !min-w-[50px]">
                    Search{" "}
                  </label>
                  {/* <Input
                type="search"
                placeholder="Search here ..."
                className="!min-w-[50px] !max-w-[188px] focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 !border !border-blue-gray-50 bg-white shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500"
                labelProps={{
                  className: "hidden",
                }}
                onChange={(e: any) => setFilteredList(e.target.value)}
              /> */}

                  {/* <Button size="sm" className="!absolute right-1 top-1 rounded">
                                Search
                            </Button> */}
                </div>
                <div className="sm:row-span-5 row-span-3 sm:h-auto">
                  {/* {isUserChatsLoading && <p>Loading chat...</p>} */}
                  {userChats
                    ?.filter(
                      (item: any) => item.recipientName.toLowerCase().indexOf(filteredList) > -1
                    )
                    .map((chat: any, index: any) => {
                      return (
                        <div key={index}>
                          <UserChat chat={chat} user={user} />
                        </div>
                      );
                    })}
                </div>
              </>
            </div>
            {/* Message Box */}
            {messageChat && recentChat ? (
              <>
                <div className="sm:row-span-1 md:col-span-3 sm:col-span-4  rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                  <BagdeInfoChat user={recentChat} />
                </div>
                <div className=" sm:row-span-5 md:col-span-3 sm:col-span-4 grid grid-rows-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <div className="row-span-5 ">
                    <MessageBox message={messageChat} user={user} recipient={recentChat} />
                  </div>
                  <div className="sm:row-span-1 mb-0 bg-cyan-800/25 rounded-t-lg flex items-center">
                    <div className="flex-none">
                      <div className=" sm:mx-3">
                        <IconButton variant="text" color="white" onClick={() => setShowModal(true)}>
                          <PhotoIcon className="h-5 w-5" />
                        </IconButton>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className=" py-1 mx-2 h-full text-white">
                        <Textarea
                          rows={2}
                          resize={true}
                          placeholder="Your Message"
                          className="min-h-full !border-0 focus:border-transparent text-white"
                          containerProps={{
                            className: "grid h-full",
                          }}
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                          onChange={(e) => updateAddMessageInfo(e.target.value)}
                          value={addMessageInfo}
                        />
                        {/* <Input
                      variant="static"
                      placeholder="Start chat"
                      className="pr-5"
                      containerProps={{
                        className: "min-w-[188px] rounded-lg",
                      }}
                      color="white"
                      onChange={(e) => updateAddMessageInfo(e.target.value)}
                      value={addMessageInfo}
                    /> */}
                        {/* <Input variant="static"  placeholder="Static" /> */}
                        {/* <Button size="sm" className="!absolute right-1 top-1 rounded">
                                            Search
                                        </Button> */}
                        {/* <h6 className=" text-xs">{addMessageInfo.length}/255</h6>                   */}
                      </div>
                    </div>
                    <div className="flex-none ">
                      <div className=" sm:mr-3">
                        <IconButton
                          variant="text"
                          color="white"
                          onClick={() => {
                            addMessage({
                              chatId: recentChat._id,
                              senderId: user._id,
                              name: recentChat.name,
                              text: addMessageInfo,
                              typeMessage: "text",
                            });
                          }}
                        >
                          <PaperAirplaneIcon className="h-5 w-5" />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="sm:row-span-6 md:col-span-3 sm:col-span-4 rounded-lg bg-gradient-to-r from-purple-700 to-pink-700 grid grid-rows-4 justify-center grayscale-50">
                  <div className=" row-span-3 mt-5 pt-10 grayscale-50">
                    <img className=" w-80 p-1" src={ImageGirl} alt="ava image" />
                  </div>
                  <div className="row-span-1 text-center text-white">
                    Please Select a Person to chat
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div className=" my-3 rounded-lg  gap-y-1">
            {/* Screen SmartPhone */}
            {recentChat && messageChat ? (
              <div className=" gap-2 grid grid-rows-6">
                {/* Message Box */}
                <div className=" row-span-1 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                  <BagdeInfoChat user={recentChat} />
                </div>
                <div className="row-span-5 grid grid-rows-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <div className="row-span-5 ">
                    <MessageBox message={messageChat} user={user} recipient={recentChat} />
                  </div>
                  <div className="sm:row-span-1 mb-0 bg-cyan-800/25 rounded-t-lg flex items-center">
                    <div className="flex-none">
                      <div className=" sm:mx-3">
                        <IconButton variant="text" color="white" onClick={() => setShowModal(true)}>
                          <PhotoIcon className="h-5 w-5" />
                        </IconButton>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="mx-2 text-white">
                      <Textarea
                          rows={2}
                          resize={true}
                          placeholder="Your Message"
                          className="min-h-full !border-0 focus:border-transparent text-white justify-center"
                          containerProps={{
                            className: "grid h-full",
                          }}
                          labelProps={{
                            className: "before:content-none after:content-none justify-center",
                          }}
                          onChange={(e) => updateAddMessageInfo(e.target.value)}
                          value={addMessageInfo}
                        />
                        {/* <Input
                          variant="static"
                          placeholder="Start chat"
                          className="pr-5"
                          containerProps={{
                            className: "min-w-[188px] rounded-lg",
                          }}
                          color="white"
                          onChange={(e) => updateAddMessageInfo(e.target.value)}
                          value={addMessageInfo}
                        /> */}
                        {/* <Input variant="static"  placeholder="Static" /> */}
                        {/* <Button size="sm" className="!absolute right-1 top-1 rounded">
                                            Search
                                        </Button> */}
                        {/* <h6 className=" text-xs">{addMessageInfo.length}/255</h6>                   */}
                      </div>
                    </div>
                    <div className="flex-none ">
                      <div className=" sm:mr-3">
                        <IconButton
                          variant="text"
                          color="white"
                          onClick={() => {
                            addMessage({
                              chatId: recentChat._id,
                              senderId: user._id,
                              name: recentChat.name,
                              text: addMessageInfo,
                              typeMessage: "text",
                            });
                          }}
                        >
                          <PaperAirplaneIcon className="h-5 w-5" />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* User List Chat */}
                <div className=" rounded-lg  bg-gradient-to-r from-purple-500 to-pink-500">
                  <div className="grid  grid-rows-6">
                    <div className=" text-white mx-3 mt-3  ">
                      <Input
                        type="search"
                        placeholder="Search here ..."
                        className="!min-w-[50px] focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 !border !border-blue-gray-50 bg-white shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500"
                        labelProps={{
                          className: "hidden",
                        }}
                        onChange={(e: any) => setFilteredList(e.target.value)}
                      />

                      {/* <Button size="sm" className="!absolute right-1 top-1 rounded">
                                Search
                            </Button> */}
                    </div>
                    <div className="row-span-5 h-auto">
                      {/* {isUserChatsLoading && <p>Loading chat...</p>} */}
                      {userChats
                        ?.filter(
                          (item: any) => item.recipientName.toLowerCase().indexOf(filteredList) > -1
                        )
                        .map((chat: any, index: any) => {
                          return (
                            <div key={index}>
                              <UserChat chat={chat} user={user} />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
      {/* <NavBar/> */}
      {/* Modal Upload Image */}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Upload Image</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setShowModal(false);
                      setBeforeUpload(null);
                      setErrorFile(null);
                    }}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <>
                  {/*body*/}
                  {beforeUpload ? (
                    <div>
                      <img
                        className=" w-80 h-80 p-1 rounded-lg object-contain"
                        src={beforeUpload.toString()}
                        alt="ava image"
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  {errorAddMessage && `Error : ${errorAddMessage}`}
                  <div className="relative p-6 flex-auto">
                    <Input
                      size="lg"
                      type="file"
                      onChange={(e) => {
                        if (e.target.files != null) {
                          handleChange(e.target.files);
                        }
                      }}
                      className="focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 !border !border-blue-gray-50 bg-white shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500"
                      labelProps={{
                        className: "hidden",
                      }}
                      required
                      accept="image/*"
                    />
                    <p className="p-2 text-red-400">{errorFile && errorFile}</p>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <Button
                      className="mt-6 text-red-500 bg-transparent uppercase"
                      fullWidth
                      onClick={() => {
                        setShowModal(false);
                        setBeforeUpload(null);
                        setErrorFile(null);
                      }}
                    >
                      Close
                    </Button>
                    {/* <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                    > */}
                    <Button
                      className="mt-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 uppercase"
                      fullWidth
                      onClick={uploadImage}
                    >
                      {/* {addChatLoading ? "Loading Add" : "ADD" } */}
                      {/* addMessage({chatId: recentChat._id, senderId: user._id, name: recentChat.name, text: file?.toString(), typeMessage: "image"}) */}
                      Send
                    </Button>

                    {/* </button> */}
                  </div>
                </>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Chat;
