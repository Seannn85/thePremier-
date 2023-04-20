
import React from 'react';
import { useGetTeamQuery } from './TeamApi';
import Nav from './Page/Nav';


function App() {
  


  const { data, isLoading, error } = useGetTeamQuery();


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  return (
    <> 
    
    <div className='bg-slate-700 h-fit'>
    <Nav/> 
    <div className='border text-red-500'>

     
     
      <h1>{data}</h1>
      
      </div>
      </div>
      </>
  )
}

export default App
