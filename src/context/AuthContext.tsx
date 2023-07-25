import React, { createContext, useCallback, useState, useEffect } from "react";
import { baseUrl, postRequest } from "../utils/service.js";

type AuthUser = {
  _id:string;
  name: string;
  token: string;
  codereferral: string;
  avatar: string;
};

type AuthLoginUser = {
  email: string;
  password: string;
}

type AuthRegisterUser = {
  name: string;
  email: string;
  password: string;
}

type UpdateUserType = {
  name: string | null | undefined;
  avatar: string | null | undefined;
}

type AuthContextProviderType = {
  children: React.ReactNode;
};

export type AuthContextType = {
  user: any;
//   setUser: any;
  registerInfo: any;
//   setRegisterInfo: any;
  updateRegisterInfo: any;
  registerError: any;
//   setRegisterError: any;
  isRegisterLoading: any;
//   setIsRegisterLoading: any;
  registerUser: any;
//   value: any;
  logoutUser: any;
  loginInfo: any;
  loginUser: any;
  loginError: any;
  updateLoginInfo: any;
  isLoginLoading: any;
  updateUpdateInfo: any;
  updateLoading: any;
  updateError: any;
  updateInfo: any;
  updateUser: any;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthContextProviderType) => {
  const [user, setUser] = useState<AuthUser | null>();
  const [registerError, setRegisterError] = useState();
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState<AuthRegisterUser>({
    name: "",
    email: "",
    password: "",
  });
  const [loginInfo, setLoginInfo] = useState<AuthLoginUser>({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState();
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [updateInfo, setUpdateInfo] = useState<UpdateUserType>({
    name: "",
    avatar: ""
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState();
  // console.log("User ini", user);
  console.log("UpdateInfo", updateInfo);

  useEffect(() => {
    const user = localStorage.getItem("User");
    if(user) setUser(JSON.parse(user));
    // console.log("User ini", user);
  }, []);

  const updateRegisterInfo = useCallback((info: any) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((info: any) => {
    setLoginInfo(info);
  }, []);

  const updateUpdateInfo = useCallback((info: any) => {
    setUpdateInfo(info);
  }, []);

  const registerUser = useCallback(async (e: any) => { 
    console.log("start")
    e.preventDefault();
    setIsRegisterLoading(true);
    // setLoginError(null)
    const response = await postRequest(
      `${baseUrl}/users/register`,
      JSON.stringify(registerInfo)
    ); 

    setIsRegisterLoading(false);

    if(response.error){
      return setRegisterError(response);
    }
    console.log("Register user", response);
    localStorage.setItem( "User",JSON.stringify(response));
    setUser(response);
    
  }, [registerInfo]);

  const loginUser = useCallback(async(e: any) => {
    console.log("start")
    e.preventDefault();
    setIsLoginLoading(true);
    // setLoginError(null)
    const response = await postRequest(
      `${baseUrl}/users/login`,
      JSON.stringify(loginInfo)
    ); 

    setIsLoginLoading(false);

    if(response.error){
      return setLoginError(response);
    }
    console.log("login user", response);
    localStorage.setItem( "User",JSON.stringify(response));
    setUser(response);

  }, [loginInfo]);

  const updateUser = useCallback(async() => {
    setUpdateLoading(true);
    if(updateInfo.name == "") {updateInfo.name=user?.name}
    if(updateInfo.avatar == "") {updateInfo.avatar = user?.avatar}

    
    const response = await postRequest(
      `${baseUrl}/users/update-profile`,
      JSON.stringify({name: updateInfo.name, avatar: updateInfo.avatar, userId: user?._id})
    );
    
    setTimeout(()=> {
      setUpdateLoading(false);
    }, 2000)
    if(response.error){
      return setUpdateError(response);
    }
    console.log("Update user", response);
    localStorage.setItem( "User",JSON.stringify(response));
    setUser(response);

  }, [updateInfo])

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading, logoutUser, loginInfo, loginUser, loginError, isLoginLoading, updateLoginInfo, updateUpdateInfo, updateError, updateLoading, updateInfo, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
