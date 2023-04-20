
const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./helpers/database/connectDatabase");
const routers = require("./routers/index")
const cors = require("cors");
// const mime = require("mime");
const process = require("process"); // add this line
const customErrorHandler = require("./controllers/middlewares/errors/customErrorHandler");


// Environment Variables
dotenv.config({
  path: "./config/env/config.env",
});

const app = express();

connectDatabase();

// Define routes here
app.use(express.json());
app.use(cors());
app.use("/api", routers);


const port = process.env.PORT || 3000;




app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log("Hello")
});
