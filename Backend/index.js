const connectToMongoFunction = require('./db');
const express = require('express')
var cors = require('cors')
 
connectToMongoFunction();

const app = express()
app.use(cors({
  origin: "https://i-notebook-project-backend.vercel.app"
}))

app.use(express.json())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


const port = 5000;
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
  });
  



