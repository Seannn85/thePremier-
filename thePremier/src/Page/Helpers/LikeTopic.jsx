import React from "react";
import { useLikeTopicMutation } from "../../TeamApi";
import { useCallback, useState ,useEffect} from "react";
import { useSelector } from "react-redux";
import ErrorMessage from "./ErrorMessage";

const LikeTopics = ({ id }) => {
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const [likeTopic, { isLoading, error, data }] = useLikeTopicMutation();
  const [errorMessage, setErrorMessage] = useState("");

  const likes = useCallback(
    async (event) => {
      event.preventDefault();

      console.log("Is Data received ? ");
      try {
        setErrorMessage("");

        const like = await likeTopic({
          id,
        }).unwrap();

      } catch (err) {
        console.log(err);
        const errorMessages =
          err.data?.message || err.message || "You've already like this topic";
        setErrorMessage(errorMessages);
      }
    },
    [likeTopic, id]
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

export default LikeTopics;
