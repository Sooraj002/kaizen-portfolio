import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormInput from "../../components/FormInput/FormInput";
import FormBtn from "../../components/FormBtn/FormBtn";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/config";

const SignIn = () => {
  const [signin, setSignIn] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignIn({ ...signin, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(signin.email, signin.password);
      if (res) {
        console.log("user Added")
        navigate("/kaizen-portfolio/dashboard"); // Redirect to protected route

      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 shadow-md rounded-md">
        <h2 className="text-center text-3xl">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-outer flex flex-col gap-7">
            <FormInput
              textField={"username"}
              inpType={"text"}
              handleFunc={handleChange}
            />
            <FormInput
              textField={"email"}
              inpType={"email"}
              handleFunc={handleChange}
            />
            <FormInput
              textField={"password"}
              inpType={"password"}
              handleFunc={handleChange}
            />
            <FormBtn text={"Sign Up"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
