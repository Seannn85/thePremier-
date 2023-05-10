// import React, { useState, useEffect } from "react";

// const ErrorMessage = ({ message }) => {
//   const [showMessage, setShowMessage] = useState(true);

//   setTimeout(() => {
//     setShowMessage(false);
//   },500); 

//   // useEffect(() => {
//   //   const timer = setTimeout(() => {
//   //     setShowMessage(false);
//   //   }, 500);

//   //   return () => {
//   //     clearTimeout(timer);
//   //   };
//   // }, []);

//   return showMessage && (
//     <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-4 px-6 bg-red-500 text-white text-lg rounded-md">
//       <p>{message}</p>
//     </div>
//   ) ;
// };

// export default ErrorMessage;

import React, { useState, useEffect, useCallback } from "react";

const ErrorMessage = ({ message }) => {
  const [showMessage, setShowMessage] = useState(true);

  const hideMessage = useCallback(() => {
    setShowMessage(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(hideMessage, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [hideMessage]);

  return showMessage && (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-4 px-6 bg-red-500 text-white text-lg rounded-md">
      <p>{message}</p>
    </div>
  ) ;
};

export default ErrorMessage;
