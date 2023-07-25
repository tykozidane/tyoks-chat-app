import { Route, Routes, Navigate } from "react-router-dom";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import NavBar from "./components/NavBar";
import { ChatContextProvider } from "./context/ChatContext";

function App() {

  const {user} = useContext(AuthContext);//console.log("userApp", user);
  return <>
  <ChatContextProvider datauser={user}>
    <NavBar/>
    <Routes>
      <Route path="/" element={!user ? <Login/> : <Chat/>}/>
      <Route path="/register" element={user ? <Navigate to={"/"}/> : <Register/>}/>
      <Route path="/login" element={user ? <Navigate to={"/"}/> :  <Login/>}/>
      <Route path="*" element={<Navigate to={"/"}/>}/>
    </Routes>
  </ChatContextProvider>
  </>
}

export default App;