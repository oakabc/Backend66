const express = require('express');
var bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

// ให้บริการ Static File จากโฟลเดอร์ "public"
app.use(express.static('public'));


app.get("/", (req, res)=>{
   res.sendFile(__dirname+"/public/index.html");
} );

app.get("/bmiCalculator", (req, res)=>{
   res.sendFile(__dirname+"/public/bmiCalculator.html");
} );

app.post("/", (req,res)=>{
   
    var result = Number(req.body.num1) + Number(req.body.num2)
    res.send("นำเลข 2 ตัวมาบวกกัน ได้ผลลัพท์คือ = " + result);
});

app.post('/bmiCalculator', (req,res) => {

   var weight = Number(req.body.weight)
   var height = Number(req.body.height)

   const BMI = weight/Math.pow(height,2)
   var description = ""

   if (BMI <= 18.5) description = "ผอมเกินไป"
   else if (BMI < 23) description = "น้ำหนักปกติ เหมาะสม"
   else if (BMI < 25) description = "น้ำหนักเกิน"
   else if (BMI < 30) description = "อ้วน"
   else description = อ้วนมาก

   res.send("คุณมี BMI = " + Math.round(BMI,2) + " " + description)

})

app.use((req, res, next) => {
   res.status(404).send("File not found!");
});


app.listen(3000, ()=> {
   console.log ("Server is running on port 3000");
});
