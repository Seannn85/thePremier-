
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

connectDatabase();

const app = express();

// Define routes here
app.use(express.json());
app.use(cors());


const port = process.env.PORT || 7000;

app.use("/api", routers);





app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
