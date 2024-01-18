import { useState } from "react";
import { User } from "../classes/user";
import { addNewUser, getUsers, userUnique } from "../functions/dbAcctoions";
import "../style/newUSerStyle.css";
import { Link, redirect, useNavigate } from "react-router-dom";

const AddUser = () => {
  const [NewUser, setNewUser] = useState(User);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => {
      if (prevState) {
        const lowercasedValue = ["nume", "prenume", "email"].includes(name)
          ? value.toLowerCase()
          : value;
        return { ...prevState, [name]: lowercasedValue };
      }
    });
  };
  const checkDataValidity = () => {
    for (const key in NewUser) {
      if (NewUser[key].trim() === "") {
        return false;
      }
    }
    return true;
  };

  const sendNewUser = async () => {
    let emailDb = await getUsers();
    let emailRes = emailDb.map((user) => {
      return user.email;
    });
    console.log(emailRes);
    console.log(emailRes.indexOf(NewUser.email));
    if (emailRes.indexOf(NewUser.email) === -1) {
      if (checkDataValidity) {
        alert("User Created");
        await addNewUser(NewUser);
        navigate("/");
      } else
        alert(
          "Datele utilizatorului nu sunt valide. Verificați toate câmpurile!"
        );
    } else {
      alert("email already used");
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="inputData">
        <label>Nume:</label>
        <input
          type="text"
          name="nume"
          onChange={(event) => {
            handleChange(event);
          }}
        />
      </div>
      <div className="inputData">
        <label>Prenume:</label>
        <input
          type="text"
          name="prenume"
          onChange={(event) => {
            handleChange(event);
          }}
        />
      </div>
      <div className="inputData">
        <label>Varsta:</label>
        <input
          type="number"
          name="varsta"
          onChange={(event) => {
            handleChange(event);
          }}
        />
      </div>
      <br />
      <div className="inputData">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          onChange={(event) => {
            handleChange(event);
          }}
        />
      </div>
      <div className="inputData">
        <label>Parola:</label>
        <input
          type="password"
          name="parola"
          onChange={(event) => {
            handleChange(event);
          }}
        />
      </div>
      <button className="inputData" onClick={sendNewUser}>
        Submit
      </button>
      <Link to="/user/login">Login</Link>
    </div>
  );
};
export default AddUser;
