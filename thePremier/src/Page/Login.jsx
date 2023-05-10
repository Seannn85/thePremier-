import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { useLoginMutation} from "../TeamApi";
import { useDispatch } from 'react-redux';
import {loginUser} from '../store/premierSlice'


const Login = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const [login, { isLoading, error }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

const navigateHandler = useCallback (() =>{
  navigate("/edit")

})
  const onReset = useCallback(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;


    try {
      const data = await login({ email, password }).unwrap();
      navigate("/", { replace: true });
      onReset();
      // setEmail("");
      // setPassword("");

      dispatch(loginUser(email));

    } catch (error) {
      onReset();

      if (error.status === 404) {
        setErrorMessage(error.data.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
      console.log("Error:", error);
    }
  };

  const handlePasswordChange = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  const handleEmailChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  return (
    <>
      {errorMessage && (
        <p className="text-red-500">
          {errorMessage || "An unknown error occurred"}
        </p>
      )}
      <input
        type="text"
        placeholder="Username"
        value={email}
        onChange={handleEmailChange}
        className="h-8 w-full  rounded-l border border-yellow-500 px-5 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        className="h-8 w-full  rounded-l border border-yellow-500 px-5 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />

      <button
        onClick={handleSubmit}
        className="text-lg font-bold text-white"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Log in"}
      </button>
      <button
        onClick={navigateHandler}
        className="text-lg font-bold text-white"
        disabled={isLoading}
      >
        Edit 
      </button>
    </>
  );
};

export default Login;
