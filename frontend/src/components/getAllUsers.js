import { useEffect } from "react";
import { Await, Link } from "react-router-dom";
import { useState } from "react";
import { getUsers } from "../functions/dbAcctoions";
import NavBar from "./navBar";

const GetAllUsers = () => {
  const [Users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setUsers(await getUsers());
    };
    fetchData();
  }, []);
  return (
    <>
      <NavBar />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NUME</th>
            <th>EMAIL</th>
            <th>VARSTA</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Users.map((user) => (
            <tr key={user.idUtilizator}>
              <td>{Users.indexOf(user) + 1}</td>
              <td>
                {user.nume}-{user.prenume}
              </td>
              <td>{user.email}</td>
              <td>{user.varsta}</td>
              <td>
                {" "}
                <Link to={`edit/${user.idUtilizator}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default GetAllUsers;
