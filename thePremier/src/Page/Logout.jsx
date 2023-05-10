import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../TeamApi";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/premierSlice';
import { useState } from 'react';

function Logout() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [logout] = useLogoutMutation({
    onSuccess: () => setIsLoading(false),
    onError: (error) => {
      setError(error);
      setIsLoading(false);
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    try {
      setIsLoading(true);
      await logout().unwrap();
      dispatch(logoutUser());
      navigate('/login');
    } catch (error) {
      console.log(error);
      setError("There was an error logging out. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button className="bg-white text-black" onClick={handleLogoutClick} disabled={isLoading}>
        {isLoading ? "Logging out..." : "Logout"}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Logout;
