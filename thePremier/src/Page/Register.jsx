import { useNavigate,Link } from "react-router-dom";
import { useState, useCallback } from "react";
import { useRegisterMutation } from "../TeamApi";


const Register = () => {
  const navigate = useNavigate();
    
   
    const [errorMessage, setErrorMessage] = useState('');
  
    const [register, { isLoading},error] = useRegisterMutation ();
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
  
  
    const handlePasswordChange = useCallback((event) => {
      setPassword(event.target.value);
    }, []);
  
    const handleEmailChange = useCallback((event) => {
      setEmail(event.target.value);
    }, []);

    const handleNameChange = useCallback((event) => {
      setName(event.target.value);
    }, []);
  
    const handleUsernameChange = useCallback((event) => {
      setUsername(event.target.value);
    }, []);
  
  
    const handleReset = useCallback(() => {
      setEmail('');
      setPassword('');
      setName('');
      setUsername('');
    }, []);
  
  

    const handleSubmit = useCallback(async (event) => {
      event.preventDefault();
  
  
     
      try {
        const response = await register({ email,name,username, password }).unwrap();


        navigate("/", { replace: true });
       handleReset();
       console.log(response)
        // setEmail("");
        // setPassword("");
      

      } catch (error) {
        handleReset();

        if (error.status === 404) {
          setErrorMessage(error.data.message)
        } else {
          setErrorMessage("An unknown error occurred");
        }
        console.log("Error:", error);
  
      }
  
  
  
  
  
  
      
    },[]);
  
    
    
    console.log(errorMessage)
    
      return (
        <div className="flex justify-start items-center bg-slate-700">
        
  
        {errorMessage && (
    <p className="text-red-500">{errorMessage || 'An unknown error occurred'}</p>
  )}
  <Link to='/' className="text-red-500 uppercase ">Home Page</Link>
   <input type="password" placeholder="password" className="border border-black" value={password} onChange={handlePasswordChange} />
      <input type="email" placeholder="email" className="border border-black"value={email} onChange={handleEmailChange} />
      <input type="text" placeholder="name" className="border border-black"value={name} onChange={handleNameChange} />
      <input type="text" placeholder="username" className="border border-black"value={username} onChange={handleUsernameChange} />
  <button
            onClick={handleSubmit}
            className="text-red-500 text-lg font-bold"
            disabled={isLoading}
          
          >
            {isLoading ? 'Registering in...' : 'Register'}
          </button>
  
          
        </div>
      );
    };
    
    export default Register;
    