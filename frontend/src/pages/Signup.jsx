import { Heading } from "../components/Heading";
import { InputBox } from "../components/Inputbox";
import { SubHeading } from "../components/Subheading";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-slate-300 h-screen flex justify-center ">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-92 text-center p-2 h-max px-4">
            <Heading label={"Sign Up"} />
            <SubHeading label={"Enter your information to create an account"}></SubHeading>
            <InputBox
              label={"First Name"}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              placeholder={"John"}></InputBox>
            <InputBox
              label={"Last Name"}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              placeholder={"Doe"}></InputBox>
            <InputBox
              label={"Email"}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder={"abcd@xxx.com"}></InputBox>
            <InputBox
              label={"Password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder={"********"}></InputBox>
            <Button
              onClick={async () => {
                const response = await axios.post("http://localhost:3000/api/v1/user/signup", { email, firstName, lastName, password });
                localStorage.setItem("token", response.data.token);
              }}
              label={"Sign Up"}></Button>
            <BottomWarning
              label={"Already have an account?"}
              buttonText="Sign In"
              to={"/signin"}></BottomWarning>
          </div>
        </div>
      </div>
    </>
  );
}
export default Signup;
