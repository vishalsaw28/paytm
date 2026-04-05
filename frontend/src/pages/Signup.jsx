import { useState } from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";
export const Signup = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your information to create account."} />
        <InputBox
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="example@gmail.com"
          label={"Username"}
        />
        <InputBox
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          placeholder="Vishal"
          label={"First Name"}
        />
        <InputBox
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          placeholder="Kumar"
          label={"Last Name"}
        />
        <InputBox
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
          label={"Password"}
        />
        <div>
          <Button
            onClick={async () => {
              setErrorMessage("");
              setSuccessMessage("");

              try {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    username,
                    firstName,
                    lastName,
                    password,
                  },
                );

                setSuccessMessage(
                  response.data?.message || "User created successfully",
                );
              } catch (error) {
                setErrorMessage(
                  error.response?.data?.message || "Signup failed. Try again.",
                );
              }
            }}
            label={"Sign up"}
          />
        </div>
        {errorMessage ? (
          <div className="text-red-600 text-sm mt-2">{errorMessage}</div>
        ) : null}
        {successMessage ? (
          <div className="text-green-600 text-sm mt-2">{successMessage}</div>
        ) : null}
        <BottomWarning
          label={"Already have an account?"}
          buttonText={"Sign in"}
          to={"/signin"}
        />
      </div>
    </div>
  );
};
