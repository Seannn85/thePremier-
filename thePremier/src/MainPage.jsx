import React from "react";
import { useState } from "react";
import { useSelector } from 'react-redux';


import { useGetTeamQuery } from "./TeamApi";
import Nav from "./Page/Nav";
import Topic from "./Page/Topic";
import Message from "./Page/Message";
import Login from "./Page/Login";
import Logout from "./Page/Logout";
import Edit from "./Page/Edit";




 

function MainPage() {
  const { data, isLoading, error } = useGetTeamQuery();
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);

 
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

 
  return (
    <div className="flex h-full flex-col bg-slate-700">
      {!isLoggedin && <Login />}
      {isLoggedin && <Logout/> }
      {isLoggedin && <Edit/> }
      <Nav />
      <br />
      <br />
      <div className="flex flex-grow flex-row">
        <div className="w-1/4 bg-slate-700">
          <Topic />
        </div>
        <div className="bg-slate-700flex w-3/4 flex-col-reverse"></div>
      </div>
    </div>
  );
}

export default MainPage;
