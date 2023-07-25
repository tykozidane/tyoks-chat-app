import {
    Card,
    Input,
    // Checkbox,
    Button,
    Typography,
    Alert
  } from "@material-tailwind/react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Register = () => {

    const {registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading } = useContext(AuthContext);

    return (
        <Card color="transparent" shadow={false} className="place-items-center my-5">
          <Typography variant="h4" color="blue-gray">
            Sign Up 
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to register.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={registerUser}>
           
            <div className=" my-3">
             {
                registerError?.error && (
                    <Alert color="red">{registerError.message}</Alert>
                )
            }
          </div>
            <div className="mb-4 flex flex-col gap-6">
              <Input size="lg" label="Name" minLength={6} required onChange={ (e) =>
                updateRegisterInfo({ ...registerInfo, name: e.target.value})
              } />
              <Input size="lg" type="email" required label="Email" onChange={ (e) =>
                updateRegisterInfo({ ...registerInfo, email: e.target.value})
              } />
              <Input type="password" size="lg" required label="Password" onChange={ (e) =>
                updateRegisterInfo({ ...registerInfo, password: e.target.value})
              } />
            </div>
            {/* <Checkbox
              label={
                (
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal"
                  >
                    I agree the
                    <a
                      href="#"
                      className="font-medium transition-colors hover:text-blue-500"
                    >
                      &nbsp;Terms and Conditions
                    </a>
                  </Typography>
                )
              }
              containerProps={{ className: "-ml-2.5" }}
            /> */}
            <Button className="mt-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" fullWidth type="submit">
              {isRegisterLoading ? "Creating Your Account" : "Register"}
            </Button>
            
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-blue-500 transition-colors hover:text-blue-700"
              >
                Sign In
              </a>
            </Typography>
          </form>
          
          
        </Card>
      );
}
 
export default Register;