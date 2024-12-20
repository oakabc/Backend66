const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise'); // Use promise-based MySQL
const app = express();
app.use(express.json()); // For parsing JSON
app.use(express.urlencoded({ extended: true })); // For parsing form data
// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pim',
  waitForConnections: true,
  connectionLimit: 10, // Limit the number of concurrent connections
  queueLimit: 0,
});

app.get("/", (req,res)=> {
  res.sendFile(__dirname+"/register.html")
})

app.post('/students', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  const connection = await pool.getConnection();
  const [result] = await connection.query(
    'INSERT INTO users (first_name, last_name, email, password, created_at) VALUES (?, ?, ?, ?, NOW())',
    [first_name, last_name, email, password]
  );
  connection.release();

  res.status(201).json({ id: result.insertId, first_name, last_name, email });
});

// Route to fetch students
app.get('/students', async (req, res) => {
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();
    try {
      // Query the database
      const [rows] = await connection.query('SELECT * FROM users');
      // result is an array: ต้องทำการ destructure !! เอาแค่ rows
        // result[0] -> rows (query results)
        // result[1] -> fields (metadata)
      res.json(rows);
    } finally {
      // Release the connection back to the pool
      connection.release();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// Minimal READ (GET) single user route
app.get('/students/:id', async (req, res) => {
  const { id } = req.params;

  const connection = await pool.getConnection();
  const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
  connection.release();

  res.json(rows[0]);
});

// Minimal UPDATE (PUT) route
app.put('/students/:id', async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, password } = req.body;

  const connection = await pool.getConnection();
  await connection.query(
    'UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ?',
    [first_name, last_name, email, password, id]
  );
  connection.release();

  res.send('Student updated');
});

// Minimal DELETE route
app.delete('/students/:id', async (req, res) => {
  const { id } = req.params;

  const connection = await pool.getConnection();
  await connection.query('DELETE FROM users WHERE id = ?', [id]);
  connection.release();

  res.send('Student deleted');
});

/// ทดสอบผ่าน http://localhost:3000/getQuery?a=1&b=2
app.get('/getQuery', function (req, res) {
  console.log(req.query) // JavaScript object
  res.send(req.query); // JSON
})

/// ทดสอบผ่าน http://localhost:3000/student/3/26
app.get('/student/:id/:age', function (req, res) {
  console.log(req.params.id)
  console.log(req.params.age)
  res.send(req.params)
})

/// ทดสอบผ่าน http://localhost:3000/add/5/10
app.get('/add/:a/:b', function (req, res) {
  var a = parseInt(req.params.a)
  var b = parseInt(req.params.b)
  //res.send((a+b).toString())
  res.send({"result": (a+b).toString()})
}
)
/// ทดสอบผ่าน http://localhost:3000/calculation/divide?first=55&second=6
app.get("/calculation/:method", (req, res) => {
  const method = req.params.method; // divide
  const first = +req.query.first; // 55
  const second = +req.query.second; // 6
  if (method === "add") {
      res.send({ "result": first + second })
  } else if (method === "subtract") {
      res.send({ "result": first - second })
  } else if (method === "multiply") {
      res.send({ "result": first * second })
  } else if (method === "divide") {
      res.send({ "result": first / second })
  }
})

/// ทดสอบใส่ body {"name": "Oak"} ผ่าน Postman ไปยัง POST localhost:3000/user  
app.post("/user", (req,res)=> {
  const user = {
      name: req.body.name,
  };
  res.send(user)
})

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000!');
});
