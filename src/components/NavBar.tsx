import {
  Navbar,
  Typography,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Input,
  Button,
  Popover,
  PopoverHandler,
  PopoverContent,
  Alert
} from "@material-tailwind/react";

import { BellIcon, Cog6ToothIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import Notification from "./chat/Notification";
import { unreadNotificationsFunc } from "../utils/unreadNotifications";

const NavBar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { updateAddChatInfo, addChat, addChatInfo, notifications } = useContext(ChatContext);
  const { user, logoutUser, updateError, updateLoading, updateUpdateInfo, updateInfo, updateUser } =
    useContext(AuthContext);
  const unreadNotifications = unreadNotificationsFunc(notifications);
  const [openPopover, setOpenPopover] = useState(false);
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };
  function updateFunc(){
    updateUser();
    setTimeout(() => {
      if(updateLoading === false && updateError == null){
                    setShowProfileModal(false);}
    }, 3000);
    
  }
  return (
    <div className="lg:mx-10 sm:mx-3">
      <Navbar className="mx-auto px-4 py-3 mt-4 bg-gradient-to-r sm:from-indigo-500 sm:via-purple-500 sm:to-pink-500 from-purple-500 to-pink-500">
        <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
        
          {user ? (<>
          <img
                        className="h-10 w-10 rounded-full"
                        src={user?.avatar}
                        alt="ava image"
                      />
          <div
            onClick={() => {
              navigator.clipboard.writeText(user.codereferral);
            }}
          >
            <Popover open={openPopover} handler={setOpenPopover}>
              <PopoverHandler {...triggers}>
                <Typography variant="h6" className="mr-4 ml-2 cursor-pointer py-1.5">
                  {user && user.name + " #" + user.codereferral}
                </Typography>
              </PopoverHandler>
              <PopoverContent {...triggers} className=" max-w-xs">
                click to copy
              </PopoverContent>
            </Popover>
          </div>
          </>) : (<>ChatApp</>)}
          
          {user && (
            <div className="ml-auto flex gap-1 md:mr-4">
              <IconButton variant="text" color="white" onClick={() => setShowModal(true)}>
                <UserPlusIcon className="w-5 h-5" />
              </IconButton>
              {/* <Notification/> */}

              <Menu>
                <MenuHandler>
                  <IconButton variant="text" color="white">
                    {unreadNotifications.length > 0 ? (
                      <div className="absolute left-3 bottom-2 w-4 h-4 bg-red-500 rounded-full text-xs">
                        {" "}
                        {unreadNotifications.length}
                      </div>
                    ) : (
                      <></>
                    )}
                    <BellIcon className="h-5 w-5" />
                  </IconButton>
                </MenuHandler>
                <MenuList className=" max-h-96">
                  {unreadNotifications.length < 1 ? (
                    <>
                      <MenuItem> There is no any notification</MenuItem>
                    </>
                  ) : (
                    <>
                      {unreadNotifications?.map((notification: any, index: any) => {
                        return (
                          <div key={index}>
                            <Notification data={notification} />
                          </div>
                        );
                      })}
                    </>
                  )}
                </MenuList>
              </Menu>

              <Menu>
                <MenuHandler>
                  <IconButton variant="text" color="white">
                    <Cog6ToothIcon className="h-5 w-5" />
                  </IconButton>
                </MenuHandler>
                <MenuList>
                  <MenuItem onClick={() => setShowProfileModal(true)}>Edit Profile</MenuItem>
                  <MenuItem>
                    <a
                      onClick={() => {
                        logoutUser();
                      }}
                      href="/login"
                      className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                    >
                      Log Out
                    </a>
                  </MenuItem>
                </MenuList>
              </Menu>

              {/* <IconButton variant="text" color="white">
                <EllipsisVerticalIcon className="h-5 w-5"/>
              </IconButton> */}
            </div>
          )}

          {/* <div className="relative flex w-full gap-2 md:w-max">
              <Input
                type="search"
                label="Type here..."
                className="pr-20"
                containerProps={{
                  className: "min-w-[288px]",
                }}
              />
              <Button size="sm" className="!absolute right-1 top-1 rounded">
                Search
              </Button>
            </div> */}
        </div>
      </Navbar>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add Friend</h3>
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
                    <Input
                      size="lg"
                      label="Referral Code"
                      onChange={(e) =>
                        updateAddChatInfo({ ...addChatInfo, codeReferral: e.target.value })
                      }
                    />
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <Button
                      className="mt-6 text-red-500 bg-transparent uppercase"
                      fullWidth
                      onClick={() => setShowModal(false)}
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
                      type="submit"
                    >
                      {/* {addChatLoading ? "Loading Add" : "ADD" } */}
                      ADD
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
      {showProfileModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Update Profile</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowProfileModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <form
                  onSubmit={() => {
                    updateFunc()
                  }}
                >
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                  {
                updateError?.error && (
                    <Alert color="red">{updateError.message}</Alert>
                )
            }
                    <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
                      Change your Username
                    </h3>
                    <Input
                      size="lg"
                      minLength={6}
                      label="Input new Username"
                      onChange={(e) => updateUpdateInfo({ ...updateInfo, name: e.target.value })}
                    />

                    <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white mt-2">
                      Change your Avatar
                    </h3>

                    <input
                      type="radio"
                      id="ava1"
                      name="avatar"
                      value="assets/images/ava1.png"
                      className="hidden peer/ava1 "
                      onChange={(e) => updateUpdateInfo({ ...updateInfo, avatar: e.target.value })}
                    />
                    <label
                      htmlFor="ava1"
                      className="inline-flex mx-2 items-center justify-between rounded-full text-gray-500 bg-white border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked/ava1:text-blue-500 peer-checked/ava1:border-blue-600   hover:border-blue-600 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <img
                        className="h-20 w-20 rounded-full"
                        src={`assets/images/ava1.png`}
                        alt="ava image"
                      />
                    </label>
                    <input
                      type="radio"
                      id="ava2"
                      name="avatar"
                      value="assets/images/ava2.png"
                      className="hidden peer/ava2"
                      onChange={(e) => updateUpdateInfo({ ...updateInfo, avatar: e.target.value })}
                    />
                    <label
                      htmlFor="ava2"
                      className="inline-flex mx-2 items-center justify-between rounded-full text-gray-500 bg-white border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked/ava2:text-blue-500 peer-checked/ava2:border-blue-600  hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <img
                        className="h-20 w-20 rounded-full"
                        src={`assets/images/ava2.png`}
                        alt="ava image"
                      />
                    </label>
                    <input
                      type="radio"
                      id="ava3"
                      name="avatar"
                      value="assets/images/ava3.png"
                      className="hidden peer/ava3"
                      onChange={(e) => updateUpdateInfo({ ...updateInfo, avatar: e.target.value })}
                    />
                    <label
                      htmlFor="ava3"
                      className="inline-flex mx-2 items-center justify-between rounded-full text-gray-500 bg-white border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked/ava3:text-blue-500 peer-checked/ava3:border-blue-600  hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <img
                        className="h-20 w-20 rounded-full"
                        src={`assets/images/ava3.png`}
                        alt="ava image"
                      />
                    </label>
                    <input
                      type="radio"
                      id="ava4"
                      name="avatar"
                      value="assets/images/ava4.png"
                      className="hidden peer/ava4"
                      onChange={(e) => updateUpdateInfo({ ...updateInfo, avatar: e.target.value })}
                    />
                    <label
                      htmlFor="ava4"
                      className="inline-flex mx-2 items-center justify-between rounded-full text-gray-500 bg-white border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked/ava4:text-blue-500 peer-checked/ava4:border-blue-600  hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <img
                        className="h-20 w-20 rounded-full"
                        src={`assets/images/ava4.png`}
                        alt="ava image"
                      />
                    </label>
                  </div>

                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <Button
                      className="mt-6 text-red-500 bg-transparent uppercase"
                      fullWidth
                      onClick={() => setShowProfileModal(false)}
                    >
                      Close
                    </Button>
                    {/* <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                    > */}
                    {
                      updateLoading ? (<>
                     <Button
                      className="mt-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 uppercase"
                      fullWidth
                      type="submit"
                      disabled
                    >
                      {/* {addChatLoading ? "Loading Add" : "ADD" } */}
                      Processing...
                    </Button>
                      </>) : (<>
                       <Button
                      className="mt-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 uppercase"
                      fullWidth
                      type="submit"
                    >
                      {/* {addChatLoading ? "Loading Add" : "ADD" } */}
                      Save
                    </Button>
                      </>)
                    }
                   

                    {/* </button> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default NavBar;
