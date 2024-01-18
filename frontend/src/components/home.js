import { useEffect, useState } from "react";
import { User } from "../classes/user";
import NavBar from "./navBar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(User);
  useEffect(() => {
    const userInSession = sessionStorage.getItem("User");

    if (!userInSession) {
      navigate("/user/login");
    } else {
      setUser(JSON.parse(userInSession));
    }
  }, []);
  return (
    <>
      <NavBar />
      <br />
      <h1>
        sal {user.nume} {user.prenume}
      </h1>
    </>
  );
};
export default Home;
