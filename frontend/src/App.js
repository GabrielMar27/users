import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import GetAllUsers from "./components/getAllUsers";
import EditUser from "./components/EditUser";
import AddUser from "./components/AddUser";
import Login from "./components/login";
import Home from "./components/home";
import { getUsers } from "./functions/dbAcctoions";
import { useEffect, useState } from "react";

function App() {
  return (
    <>
      {" "}
      <Routes>
        <Route path="user" element={<GetAllUsers />}></Route>
        <Route path="user/edit/:idUtilizator" element={<EditUser />}></Route>
        <Route path="/user/login" element={<Login />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="user/newUser" element={<AddUser />}>
          Add User
        </Route>
      </Routes>
    </>
  );
}

export default App;
