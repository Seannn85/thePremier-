import React from "react";
import { useUnLikeTopicMutation } from "../../TeamApi";
import { useCallback, useState ,useEffect} from "react";
import { useSelector } from "react-redux";
import ErrorMessage from "./ErrorMessage";

const UnLikeTopics = ({ id }) => {
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const [unLikeTopic, { isLoading, error, data }] = useUnLikeTopicMutation();
  const [errorMessage, setErrorMessage] = useState("");

  const unLikes = useCallback(
    async (event) => {
      event.preventDefault();

      console.log("Is unLike Data received ? ");
      try {
        setErrorMessage("");

        const unLike = await unLikeTopic({
          id,
        }).unwrap();
        console.log("You successfully unlike the topic ");


      } catch (err) {
        console.log(err);
        const errorMessages =
          err.data?.message || err.message || "You've already unlike this topic";
        setErrorMessage(errorMessages);
      }
    },
    [unLikeTopic, id]
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
          <button onClick={unLikes} disabled={isLoading}>
            {isLoading ? "Unliking..." : "Unlike"}
          </button>
        </div>
      )}
    </>
  );
};

export default UnLikeTopics;
