import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  useGetTopicQuery,
  useWriteTopicMutation,
  useSearchTopicMutation,
} from "../TeamApi";
import Message from "./Message";
import { useSelector } from "react-redux";
import LikeTopics from "./Helpers/LikeTopic";
import UnLikeTopics from "./Helpers/UnLikeTopic";

const Topic = () => {
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const { data: topics, isLoading, error, refetch } = useGetTopicQuery();
  const [writeTopic] = useWriteTopicMutation();
  const [searchTopic] = useSearchTopicMutation();
  const [slug, setSlug] = useState();

  const [message, setMessage] = useState();

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

        // console.log(searchTopicData.data.messages[0]._id)

        setId(searchTopicData.data._id);
        console.log(searchTopicData.data.messages);

        setTitle("");
      } catch (err) {
        console.log(err);
      }
    },
    [writeTopic, searchTopic, title, message, id]
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
      <div className="flex text-white">
        <div className="flex-1">
          <ul>
            {topics.map((topic) => (
              <div key={topic._id}>
                <li>
                  <Link
                    onClick={() => {
                      setMessage(topic.messages);
                      setId(topic._id);
                      setTitle(topic.title);
                    }}
                  >
                    {topic.title}
                  </Link>
                </li>
                <div className="flex space-x-5 items-center justify-center"> 
                <LikeTopics id={topic._id} />
                <UnLikeTopics id={topic._id} />
                </div>
              </div>
            ))}
          </ul>
        </div>
        <div className="flex-1">
          <form action="submit" onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              name="title"
              className="border border-black text-black"
              onChange={handleSearchChange}
              placeholder="Deger Gir"
            />
            <button className="text-white transition duration-300 ease-in-out hover:bg-gray-700">
              Search
            </button>
          </form>

          <div className="mt-4">
            <Message topic_id={id} messages={message} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic;
