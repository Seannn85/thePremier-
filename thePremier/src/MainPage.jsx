
import React from 'react';
import { useState } from 'react';


import { useGetTeamQuery } from './TeamApi';
import Nav from './Page/Nav';
import Topic from './Page/Topic';
import Message from './Page/Message';
import Login from './Page/Login';


function MainPage() {

  

  const { data, isLoading, error } = useGetTeamQuery();
  const [search,setSearch] = useState(false)


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  console.log(data)


  const getSearch = (param)=>  {
    setSearch(param);
  }
  return (
    <div className='bg-slate-700 h-full flex flex-col'>

    <Login getSearch={getSearch}/> 
      <Nav />
      <br/>
      <br/>
      <div className='flex-grow flex flex-row'>
        <div className='w-1/4 bg-slate-700'>
          <Topic search={search} />
        </div>
        <div className='w-3/4 bg-slate-700flex flex-col-reverse'>
          
        </div>
      </div>
    </div>
  );
}



export default MainPage
