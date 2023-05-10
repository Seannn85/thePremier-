import React from "react";
import { useWriteMessageMutation } from "../TeamApi";
import { useState, useCallback } from "react";
import Cookies from "js-cookie";
import { useSelector,useDispatch } from "react-redux";
import LikeMessages from "./Helpers/LikeMessage";
import UnLikeMessages from "./Helpers/UnLikeMessage";

const Message = ({ topic_id, messages }) => {
  const [content, setContent] = useState("");
  const [messageId, setMessageId] = useState("");
  const [topicId,setTopicId] = useState('');


  const [writeMessage, { isLoading, error }] = useWriteMessageMutation();
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const dispatch = useDispatch();


  const token = Cookies.get("access_token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const handleMessage = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const message = await writeMessage({
          topic_id,
          credentials: { content },
          headers,
        });
        // console.log(topic_id)
        // console.log(message.data._id)
        console.log(messages)
        setMessageId(message.data._id)
        setTopicId(topic_id);
        console.log(topicId);
        console.log(messageId);

        setContent("");
      } catch (err) {
        console.log(err);
      }

   
    },
    [writeMessage, content,topic_id]
  );

  const handleMessageChange = useCallback((event) => {
    setContent(event.target.value);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="mt-4">
        {messages?.map((singleMessage) => (
          <ul key={singleMessage._id}>
            <li >{singleMessage.content}</li>
            <LikeMessages topic_id={singleMessage.topic} message_id={singleMessage._id} />
            <UnLikeMessages topic_id={singleMessage.topic} message_id={singleMessage._id} />


          </ul>
        ))}
      </div>
      {isLoggedin && (
        <form onSubmit={handleMessage}>
          <input
            value={content}
            name="message"
            type="text"
            placeholder="Write your message here!!!!"
            onChange={handleMessageChange}
            className="text-black"
          />
          <button type="submit" className="text-white">
            Create a New Message
          </button>
        </form>
        
      )
      
      }

    </div>
  );
};

export default Message;
