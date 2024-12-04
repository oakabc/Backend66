const express = require('express')
const app = express()

app.get('/', function (req, res) { // Home Route
  res.send('Hello World')
})
app.get('/aboutme', function (req, res) { // About Me Route
    res.send('About me !')
})
app.get('/my-html', (req, res) => {
    res.send('<h1>This is normal HTML</h1>');
 });
 
 app.get('/my-json-api', (req, res) => {
    res.send('{"myJsonKey": "myJsonValue"}');
 });
 
 app.get('/my-json-api2', (req, res) => {
    res.json({"myJsonKey": "myJsonValue"});
 });
 
 app.get('/users', (req, res) => {
    res.json([
      {
        id: 1,
        name: 'A',
      },
      {
        id: 2,
        name: 'B',
      },
    ]);
   });
   
// Middleware to handle unmatched routes
app.use((req, res, next) => {
  res.status(404).send({
    error: 'Not Found',
    message: 'เข้ามาทาง (Path) ที่ไม่ได้สร้างเอาไว้ โปรดใช้เส้นทางที่ถูกต้อง',
  });
});

app.listen(3000, () => {
    console.log("Server started on port 3000 !")
})