import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <div>
        <div className="flex items-center justify-end">
          {/* <Register password={password} email={email} /> */}

          <Link to="/register" className="text-white ">
            {" "}
            Register{" "}
          </Link>
          <br />
          <br />
          <br />
        </div>
      </div>
    </>
  );
};

export default Nav;
