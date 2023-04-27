import { useNavigate } from "react-router-dom";
import { useState,useCallback } from "react";
import { useLoginMutation } from "../TeamApi";


const Login = ({getSearch}) => {
  const navigate = useNavigate();
    
   
    const [errorMessage, setErrorMessage] = useState('');
  
    const [login, { isLoading,error}] = useLoginMutation();
  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  
  const onReset = useCallback(() => {
    setEmail('');
    setPassword('');
  }, []);

    const handleSubmit = async (event) => {
      event.preventDefault();

      
  
      if (isLoading) return <div>Loading...</div>;
      if (error) return <div>Error: {error.message}</div>;
     
      try {
       const data =  await login({ email, password }).unwrap();
        navigate("/", { replace: true });
        onReset();
        // setEmail("");
        // setPassword("");
      
getSearch(true);
      } catch (error) {
        onReset();

        if (error.status === 404) {
          setErrorMessage(error.data.message)
        } else {
          setErrorMessage("An unknown error occurred");
        }
        console.log("Error:", error);
  
      }
  
  
  
  
  
  
      
    };
  
    
    
    console.log(errorMessage)

    const handlePasswordChange = useCallback((event) => {
      setPassword(event.target.value);
    }, []);
  
    const handleEmailChange = useCallback((event) => {
      setEmail(event.target.value);
    }, []);
    
      return (
        <>
        
  
        {errorMessage && (
    <p className="text-red-500">{errorMessage || 'An unknown error occurred'}</p>
  )}
      <input
            type="text"
            placeholder="Username"
            value={email}
            onChange={handleEmailChange}
       
            className="w-full px-5  h-8 rounded-l border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
           <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
       
            className="w-full px-5  h-8 rounded-l border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          
  
  <button
            onClick={handleSubmit}
            className="text-white text-lg font-bold"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
  
          
        </>
      );
    };
    
    export default Login;
    