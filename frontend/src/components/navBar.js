import { Link, useNavigate } from "react-router-dom";
const NavBar = () => {
  let navigate = useNavigate();
  let userLoggedIn = sessionStorage.getItem("userLoggedIn");
  const killSession = () => {
    sessionStorage.clear();
    navigate("/");
  };
  return (
    <>
      <nav
        style={{
          display: "flex",
          width: "25%",
          justifyContent: "space-around",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/user">getAllUsers</Link>
        <Link to="/user/newUser">Add User</Link>
        {!userLoggedIn ? (
          <Link to="/user/login">Login</Link>
        ) : (
          <Link onClick={killSession}>Logout</Link>
        )}
      </nav>
    </>
  );
};
export default NavBar;
