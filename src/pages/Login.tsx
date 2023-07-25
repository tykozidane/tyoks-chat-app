import {
    Card,
    Input,
    Button,
    Typography,
    Alert
  } from "@material-tailwind/react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {

    const {loginUser, loginInfo, loginError, isLoginLoading, updateLoginInfo} = useContext(AuthContext)
    return (
        <Card color="transparent" shadow={false} className="place-items-center my-5">
          <Typography variant="h4" color="blue-gray">
            Sign In
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your email and password.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={loginUser}>
          <div className=" my-3">
             {
                loginError?.error && (
                    <Alert color="red">{loginError.message}</Alert>
                )
            }
          </div>
            <div className="mb-4 flex flex-col gap-6">
              <Input size="lg" type="email" required label="Email" onChange={(e) => updateLoginInfo({...loginInfo, email: e.target.value})}/>
              <Input type="password" size="lg" required label="Password" onChange={(e) => updateLoginInfo({...loginInfo, password: e.target.value})} />
            </div>
            <Button className="mt-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" fullWidth type="submit">
            {isLoginLoading ? "Process Login" : "Login"}
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Doesn't have an account?{" "}
              <a
                href="/register"
                className="font-medium text-blue-500 transition-colors hover:text-blue-700"
              >
                Sign Up
              </a>
            </Typography>
          </form>
        </Card>
      );
}
 
export default Login;