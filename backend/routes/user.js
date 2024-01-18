const express = require("express");
const router = express.Router();
const con = require("../database");
//get all users
router.get("/", (req, res) => {
  let sqlQuery = "SELECT * FROM utilizator";
  con.query(sqlQuery, (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(`rezultat_toti_utilizatorii:${JSON.stringify(result)}`);
  });
});

//get user by id
router.get("/edit/:idUtilizator", (req, res) => {
  let { idUtilizator } = req.params;
  console.log(idUtilizator);
  let query = "SELECT * FROM utilizator WHERE idUtilizator=?";
  con.query(query, [idUtilizator], (err, result) => {
    if (err) throw err;
    console.log(
      `rezultat:_update_utilizator_${idUtilizator}:${JSON.stringify(result)}`
    );
    res.send(result).status(200);
  });
});
router.post("/login", (req, res) => {
  let { email, parola } = req.body;

  let query = "SELECT * FROM utilizator WHERE email=? AND parola=?";
  con.query(query, [email, parola], (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});
//delete one user by id
router.delete("/", (req, res) => {
  let { idUtilizator } = req.body;
  console.log(req.body);

  let query = "DELETE FROM utilizator WHERE idutilizator=?";
  con.query(query, [idUtilizator], (err, result) => {
    if (err) throw err;
    console.log(`rezultat_delete:${JSON.stringify(result)}`);
    res.send(result);
  });
});
//check if email is used
router.get("/newUser/:email", (req, res) => {
  let { email } = req.params;
  let query = "SELECT email FROM utilizator WHERE email=?";
  con.query(query, [email], (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(`rezultat_email_folosit:${JSON.stringify(result)}`);
  });
});
//check login Data

//update utilizator
router.put("/edit/:idUtilizator", (req, res) => {
  let { idUtilizator } = req.params;
  let { nume, prenume, email, varsta, parola } = req.body;

  let utilizator = { nume, prenume, email, varsta, parola };
  let query = "UPDATE utilizator SET ? WHERE idUtilizator=?";
  con.query(query, [utilizator, idUtilizator], (err, result) => {
    if (err) throw err;
    console.log(`rezultat:_update_utilizator:${JSON.stringify(result)}`);
    res.send(result);
  });
});

//add new user
router.post("/newUser", (req, res) => {
  let { nume, prenume, email, varsta, parola } = req.body;
  varsta = Number(varsta);
  let utilizator = { nume, prenume, email, varsta, parola };
  let query = "INSERT INTO  utilizator set ?";
  con.query(query, [utilizator], (err, result) => {
    if (err) throw err;
    console.log(`rezultat_nou_utilizator:${JSON.stringify(result)}`);
    res.send(result);
  });
});

module.exports = router;
