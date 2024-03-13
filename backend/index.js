import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const port = 8800;

const db= mysql.createConnection({
    connectionLimit : 10,
    host:"localhost",
    user:"user1",
    password:"0000",
    database:"test"
})

// If there is a auth problem
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '0000';

app.use(express.json())
app.use(cors())

app.get("/", (req, res)=>{
    res.json("hello this is the backend");
})

app.get("/books", (req, res)=>{
    const q = "SELECT * FROM books";
    db.query(q, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post("/books", (req, res)=>{
    const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
    ];

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been created successfully");
    })
})

app.listen(port, () => {
  console.log(`Connected to backend`);
})