const express = require("express");
const BackendRouter = express.Router();
const mysql = require("mysql");

const db = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "login_practice",
});

// BackendRouter.use(fileUpload());

db.getConnection((err, connection) => {
  //for checking db connection to local server
  if (err) throw err; // not connected
  console.log("Connected!");
});

BackendRouter.post("/save", function (req, res) {
  console.log("hi");
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  console.log("name",name);
  console.log("hiiii");

  if(!name && !email && !password ){
    return res.status(400).send({
       message:"Invalid name,email & password"
     })
   }

  db.getConnection(async (err, connection) => {
    if (err) throw err;
    console.log("db connected");

    const sqlSearch = "SELECT *FROM auth_info WHERE email=?";
    const search_query = mysql.format(sqlSearch, [email]);

    const sqlInsert =
      "INSERT INTO auth_info (name,email,password) VALUES (?,?,?)";
    const insert_query = mysql.format(sqlInsert, [name, email, password]);

    // now asking the connection for sql database for the given record;
    await connection.query(search_query, async (err, result) => {
      if (err) throw err;
      console.log("------>searching for result");
      console.log(result.length);
      if (result.length != 0) {
        // releasing the connection with database;
        connection.release();
        console.log("Record already exists");
        res.json({
          message: "Record already exists",
        });
      } else {
        await connection.query(insert_query, (err, result) => {
          if (err) throw err;
          console.log("data inserted");
          res.json({
            message: "record inserted successfully",
            result: result,
          });
          connection.release();
        });
      }
    });
  });
});

BackendRouter.get("/show", async (req, res) => {
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = "SELECT * FROM auth_info";
    await connection.query(sqlSearch, (err, result) => {
      if (err) throw err;
      console.log("result", result);
      res.json({
        message: "Get Query Executed",
        records: result,
      });
      connection.release();
    });
  });
});

module.exports = BackendRouter;
