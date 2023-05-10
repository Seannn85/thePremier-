import React from "react";
import { useLikeMessageMutation } from "../../TeamApi";
import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ErrorMessage from "./ErrorMessage";


const LikeMessages = ({ topic_id, message_id }) => {
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const [likeMessage, { isLoading, error, data }] = useLikeMessageMutation();
  const [errorMessage, setErrorMessage] = useState("");

  const likes = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        setErrorMessage("");

        const like = await likeMessage({
          topic_id,
          message_id,
        }).unwrap();
        setErrorMessage("");

      } catch (err) {
        console.log(err);
        console.log("isLoading:", isLoading);
        const errorMessages =
          err.data?.message ||
          err.message ||
          "You've already like this message";
        setErrorMessage(errorMessages);
      }
    },
    [likeMessage, message_id, topic_id]
  );


  
  if (isLoading) return <div>Liking...</div>;
  if (error) {
    console.log(error);
  }

  return (
    <>
      {errorMessage && <ErrorMessage message={errorMessage} />}

      {isLoggedin && (
        <div>
          <button onClick={likes} disabled={isLoading}>
            {isLoading ? "Liking..." : "Like"}
          </button>
        
        </div>
      )}
    </>
  );
};

export default LikeMessages;
