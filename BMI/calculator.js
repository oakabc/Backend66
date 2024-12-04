const express = require('express');
var bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
// ใช้ Static File จากโฟลเดอร์ "public"
app.use(express.static('public'));


app.get("/", (req, res)=>{
   res.sendFile(__dirname+"/public/index.html");
} );

// 1. ทำ GET PATH ไปยัง /bmiCalculator เพื่อให้แสดง bmiCalculator.html
app.get("/bmiCalculator", (req, res) => {
   res.sendFile(__dirname + '/public/bmiCalculator.html')
})

// 2. POST /bmiCalculator เพื่อรับค่า weight, height ผ่าน body และ คำนวน BMI
app.post("/bmiCalculator", (req, res) => {

   var weight = Number(req.body.weight); // String -> Number
   var height = Number(req.body.height); // String -> Number

   const BMI = weight/Math.pow(height,2)

   var description = ""

   if (BMI <= 18.5) description = "ผอมเกินไป"
   else if (BMI < 23) description = "น้ำหนักปกติ เหมาะสม"
   else if (BMI < 25) description = "น้ำหนักเกิน"
   else if (BMI < 30) description = "อ้วน"
   else description = "อ้วนมาก"

   res.send("คุณมีค่า BMI = " + Math.round(BMI) + " , คุณอยู่ในเกณฑ์ = " + description)
})

app.post("/", (req,res)=>{
   
    var result = Number(req.body.num1) + Number(req.body.num2)
    res.send("นำเลข 2 ตัวมาบวกกัน ได้ผลลัพท์คือ = " + result);
});

app.use((req, res, next) => {
   res.status(404).send("File not found!");
});


app.listen(3000, ()=> {
   console.log ("Server is running on port 3000");
});
