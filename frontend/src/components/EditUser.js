import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { deleteUser, getUserById, updateUser } from "../functions/dbAcctoions";
import { User } from "../classes/user";
import styles from "../style/buttonStyle";

const EditUser = () => {
  const params = useParams();
  const [utilizator, setUtilizator] = useState(User);
  const { idUtilizator } = params;
  const navigate = useNavigate();
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const disableButton = () => {
    setButtonDisabled(true);
  };

  const enableButton = () => {
    setButtonDisabled(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      if (idUtilizator !== undefined) {
        let id = Number(idUtilizator);
        let resp = await getUserById(id);
        setUtilizator(resp[0]);
      }
    };

    fetchData();
  }, [idUtilizator]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nume" || name === "prenume") {
      if (!isNaN(value)) {
        enableButton();
      } else {
        disableButton();
      }
    }
    setUtilizator((prevState) => {
      if (prevState) {
        return { ...prevState, [name]: value };
      }
    });
  };

  const handleDelete = async () => {
    if (window.confirm(`Stergi utilizatorul ${utilizator.nume}`)) {
      await deleteUser(utilizator.idUtilizator);
      navigate("/user");
    }
  };
  const sendData = async () => {
    await updateUser(utilizator);
    setUtilizator(utilizator);
    navigate("/user");
  };
  return (
    <div>
      {utilizator ? (
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>nume</th>
              <th>prenume</th>
              <th>varsta</th>
              <th>email</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{utilizator.idUtilizator}</td>
              <td>
                <input
                  name="nume"
                  type=""
                  value={utilizator.nume}
                  onChange={(event) => handleChange(event)}
                />
              </td>
              <td>
                <input
                  name="prenume"
                  type=""
                  value={utilizator.prenume}
                  onChange={(event) => handleChange(event)}
                />
              </td>
              <td>
                <input
                  name="varsta"
                  type="number"
                  value={utilizator.varsta}
                  onChange={(event) => handleChange(event)}
                />
              </td>
              <td>
                {" "}
                <input
                  name="email"
                  type="text"
                  value={utilizator.email}
                  onChange={(event) => handleChange(event)}
                />
              </td>
              <td style={{ display: "flex", flexDirection: "column" }}>
                <button
                  disabled={!isButtonDisabled}
                  style={
                    !isButtonDisabled
                      ? styles.disabledButton
                      : styles.enabledButton
                  }
                  onClick={sendData}
                >
                  Confirm Change
                </button>
                <button style={styles.enabledButton} onClick={handleDelete}>
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Încărcare...</p>
      )}
    </div>
  );
};

export default EditUser;
