const express = require('express')
const app = express()

let fs = require('fs');

fs.writeFile('demofile1.txt', 'test content', 'utf8', (err) => {
  if (!err) console.log('write complete!!');
  else console.log("Cannot write file")

});

fs.readFile('demofile1.txt', 'utf8', (err, data) => {
    console.log(data);
});

fs.writeFile('demofile2.txt', 'file2 content', 'utf8', function (err) {
    console.log("write file 2 success")
    fs.readFile('demofile2.txt', 'utf8', function (err, data) {
        console.log("read file 2", data);
    });
});

app.listen(3000, () => {
   console.log("Server started on port 3000 !")
})
