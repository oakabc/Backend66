const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(express.json()); // For parsing JSON
app.use(express.urlencoded({ extended: true })); // For parsing form data


app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.get('/mylist', (req, res) => {
    const myList = ['Item 1', 'Item 2', 'Item 3'];
    res.render('mylist.ejs', { myList: myList });
  });
  

app.post("/submit", (req,res) => {
    const name = req.body["name"]
    res.render("index.ejs", {name: req.body["name"]})
})

app.listen(3000, () => {
    console.log("Server started on port 3000")
})