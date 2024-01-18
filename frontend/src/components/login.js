import { useState } from "react";
import { loginDB } from "../functions/dbAcctoions";
import { User } from "../classes/user";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({ email: "", parola: "" });
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const data = await loginDB(user);

      if (data && data.length > 0) {
        // Înlocuiește sessionStorage.setItem cu localStorage.setItem, dacă este necesar
        sessionStorage.setItem("User", JSON.stringify(data[0]));
        sessionStorage.setItem("userLoggedIn", true);
        navigate("/");
      } else {
        alert("Datele de conectare introduse greșit");
      }
    } catch (error) {
      console.error("Eroare la autentificare:", error);
      alert(
        "A apărut o eroare la autentificare. Vă rugăm să încercați din nou."
      );
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => {
      if (prevState) {
        const lowercasedValue = ["email"].includes(name)
          ? value.toLowerCase()
          : value;
        return { ...prevState, [name]: lowercasedValue };
      }
    });
  };
  return (
    <>
      <h1>Login</h1>
      <label>Email:</label>
      <input
        type="text"
        name="email"
        onChange={(event) => {
          handleChange(event);
        }}
      ></input>
      <br />
      <label>Parola:</label>
      <input
        type="text"
        name="parola"
        onChange={(event) => {
          handleChange(event);
        }}
      ></input>
      <br />
      <button onClick={handleSubmit}>Login</button>
      <br />
      <Link to="/user/newUser">Register</Link>
    </>
  );
};

export default Login;
