import React from "react";
import { useUnLikeMessageMutation } from "../../TeamApi";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
// import UnLikeError from "./UnLikeError";
import ErrorMessage from "./ErrorMessage";



const UnLikeMessages = ({ topic_id, message_id }) => {
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const [unLikeMessage, { isLoading, error, data }] = useUnLikeMessageMutation();
  const [errorMessage, setErrorMessage] = useState("");

  const unLike = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        setErrorMessage("");

        const unLikeSelectedMessage = await unLikeMessage({
          topic_id,
          message_id,
        }).unwrap();
        console.log("data:", data);

        console.log(unLikeSelectedMessage);
        console.log("You succesfully unliked the message");

      } catch (err) {
        console.log(err);
        const errorMessages =
          err.data?.message ||
          err.message ||
          "You cannot unlike this topic";
        setErrorMessage(errorMessages);
      }
    },
    [message_id,errorMessage, topic_id]
  );


  
  if (isLoading) return <div>Unliking...</div>;
  if (error) {
    console.log(error);
  }

  return (
    <>

      {isLoggedin && (
        <div>
          <button onClick={unLike} disabled={isLoading}>
            {isLoading ? "Unliking..." : "Unlike"}

          </button>

        
        </div>
        
      )}

{errorMessage && <ErrorMessage message={errorMessage} />}

    </>
  );
};

export default UnLikeMessages;
