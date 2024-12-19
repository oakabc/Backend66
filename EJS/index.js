const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(express.json()); // For parsing JSON
app.use(express.urlencoded({ extended: true })); // For parsing form data


app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.post("/submit", (req,res) => {
    const name = req.body["name"]
    res.sendFile(__dirname+"/index.html")
})

app.listen(3000, () => {
    console.log("Server started on port 3000")
})