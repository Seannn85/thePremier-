



const Nav = () => {
  
  
  
  
    return (
      <>
        <nav className=" top-0 w-full flex space-x-6 items-center bg-slate-700 ">
          <div className="text-left pl-6 text-2xl basis-1/4 font-body text-yellow-500">
            Galatasaray Sozluk
          </div>
  
        <div>

        <div className="rounded-lg w-3/4">
      <form className="flex  items-center">
        <input
          type="text"
          placeholder="topic #entry @nick"
     
          className="w-full px-5  h-8 rounded-l border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />


        <div className="flex justify-center items-center text-xs border-yellow-500 bg-gradient-to-b from-yellow-400 to-yellow-500 text-black cursor-pointer hover:from-yellow-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500">
          <button className="p-1 h-8 border-r border-gray-500" type="submit" >
            Getir
          </button>
           <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="p-1 w-6 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
            />
          </svg> 
        </div> 
      </form>
      

    
    </div>
        </div>
          
    
      
          <div className="text-white text-xs ">
            <div className="flex items-center justify-end space-x-4  ">
            
        
            
              <a
                href="#"
                className="border border-yellow-400 p-1 bg-yellow-400 text-black font-verdana rounded hover:brightness-125"
              >
                Deleted
              </a>
              <a
                href="#"
                className="border border-red-600 rounded p-1  bg-red-600 text-nav font-verdana"
              >
                Follow
              </a>
      
  
            </div>
          </div>
        </nav>
  
  
  
        <div className="flex border-b-2 mb-4 border-gray-800 text-xs mt-4">
    <div className="w-1/2 pb-2">
      <div className="font-verdana text-nav font-bold flex space-x-4 pl-1">
        <div className="border-r-2 pr-4 hover:underline border-slate-500">
          Today
        </div>
        <div className="border-r-2 pr-4 border-slate-500">What's on</div>
        <div className="border-r-2 pr-4 border-slate-500">10</div>
        <div className="border-r-2 pr-4 border-slate-500">Team</div>
        <div className="border-r-2 pr-4 pl-2 border-slate-500">...</div>
      </div>
    </div>
  
    <div className="fixed right-0">
      <div className="flex justify-end w-full text-white">
        <div className="flex space-x-4 pl-1 pb-2">
          <div className="border-r-2 border-l-2 pl-4 pr-4 border-slate-500">
            Match Center
          </div>
          <div className="border-r-2 pr-4 whitespace-normal border-slate-500">
            Control Center
          </div>
          <div className="border-r-2 pr-4 whitespace-nowrap truncate border-slate-500">
            Fan-Zone
          </div>
          <div className="border-r-2 pr-4 border-slate-500">Who's in</div>
          <div className="pr-3">Stats</div>
        </div>
      </div>
    </div>
  </div>
  
        
      </>
    );
  };
  
  export default Nav;
  
  