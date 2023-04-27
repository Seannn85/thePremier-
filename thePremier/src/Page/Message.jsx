import React from 'react';
import { useWriteMessageMutation } from '../TeamApi';
import { useState, useCallback } from 'react';
import Cookies from 'js-cookie';

const Message = ({topic_id}) => {
  const [content, setContent] = useState('');
 

  const [writeMessage, { isLoading,error}] = useWriteMessageMutation();


  const token = Cookies.get('access_token');
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

const handleMessage = useCallback(async (event) => {
    event.preventDefault();
    try {

        const message = await writeMessage({
            topic_id,
            credentials: { content },
            headers,
          });   

         
    
        setContent('');
  


    } catch (err) {
        console.log(err)
    }
}, [writeMessage, content]);

  const handleMessageChange = useCallback((event) => {
    setContent(event.target.value);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <form onSubmit={handleMessage}>
        <input
          value={content}
          name="message"
          type="text"
          placeholder="Write your message here!!!!"
          onChange={handleMessageChange}
          className='text-black'
        />
        <button type="submit" className="text-white">
          Create a New Message
        </button>
      </form>
    
    </div>
  );
};

export default Message;
