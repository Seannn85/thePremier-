

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useGetTopicQuery, useWriteTopicMutation,useSearchTopicMutation } from '../TeamApi';
import Message from './Message';



const Topic = ({search}) => {
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');
  const { data: topics, isLoading, error, refetch } = useGetTopicQuery();
  const [writeTopic] = useWriteTopicMutation();
  const [searchTopic] = useSearchTopicMutation();
  const [slug, setSlug] = useState();
 


  const [message,setMessage] = useState()
  const [messageByTopic,setMessageByTopic] = useState(false)

  const handleSearchChange = useCallback((event) => {
    setTitle(event.target.value);
    
  }, []);


 




  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
    //   const title = event.target.title.value;

    // console.log(topics[0].messages[0].content)

      try {

      
     
            
            const searchTopicData = await searchTopic({ title });
            setMessage(searchTopicData.data.messages);
            setSlug(searchTopicData.data.slug);
            // console.log(title)
            // console.log(searchTopicData.data.messages[0].content)
            // console.log(messageByTopic)
           
console.log(searchTopicData)
   
        setId(searchTopicData);

        setTitle('')
      } catch (err) {
        console.log(err);
      }
    },
    [writeTopic,searchTopic,title]
  );


  

 

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);

  
 


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  return (
    <>
       <div className='text-white flex'>
        <div className='flex-1'>
          <ul>
            {topics.map((topic) => ( 
              <li key={topic._id}>
                <Link onClick={() => {setMessage(topic.messages); setTitle(topic.title)}}>
{topic.title}</Link>
              </li>
))}
          </ul>
        </div>
        <div className='flex-1'>
          <form action='submit' onSubmit={handleSubmit}>
            <input
              type='text'
              value={title}
              name='title'
              className='border text-black border-black'
              onChange={handleSearchChange}
              placeholder='Deger Gir'
            />
            <button  className='text-white transition duration-300 ease-in-out hover:bg-gray-700'>
              Search
            </button>
          </form>
          <div className='mt-4'>
            {message?.map((singleMessage)=>(
    <ul>
        <li key={singleMessage._id}>{singleMessage.content}</li>
    </ul>
            ))}
          </div> 
          {search && <div className='mt-4'>
            <Message topic_id={id} />
          </div>}
        </div>
      
         
      </div>

    </>
  );
};

export default Topic;







