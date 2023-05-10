import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useEditMutation } from "../TeamApi";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {editEmailDetails,editUsernameDetails} from '../store/premierSlice';
import { useDispatch } from "react-redux";

const Edit = () => {
    const isLoggedin = useSelector((state) => state.auth.isLoggedin);
    const [edit, { isLoading, error }] = useEditMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const [editUsername, setEditUsername] = useState("");
    const [editEmail, setEditEmail] = useState("");
  
    const handleUsername = useCallback((e) => {
      setEditUsername(e.target.value);
    }, []);
  
    const handleEmail = useCallback((e) => {
      setEditEmail(e.target.value);
    }, []);
  
    const editDetails = useCallback(async (event) => {
      event.preventDefault();
  
  
      try {
        const data = await edit({username: editUsername, email: editEmail }).unwrap();

        dispatch(editUsernameDetails({ username: editUsername }));
        dispatch(editEmailDetails({ email: editEmail }));
     
        console.log(data);
        navigate("/", { replace: true });
      } catch (error) {
        console.log("Error:", error);
        dispatch(editUsernameDetails({ error: error.message }));
        dispatch(editEmailDetails({ error: error.message }));
      }
    }, [editEmail, editUsername]);
  
  
  return (
    <>
    { isLoggedin ? <form onSubmit={editDetails} className="text-white">
<div>
          <h1>Edit Account</h1>

<label htmlFor="usernameInput"> New Username</label>
        <input name='usernameInput' value={editUsername} className="text-black" type="text" onChange={handleUsername}/>  
        <label htmlFor="emailInput"> New Email</label>
        <input name="emailInput" value={editEmail} className="text-black"  type="text" onChange={handleEmail} />
        
        </div>
        <div>
        <button> Edit </button>
        </div>
        
        </form> : <div> Please Login First</div>}
    </>
  );
};

export default Edit;








