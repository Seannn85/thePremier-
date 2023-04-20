const express = require("express");
const { getSingleUser } = require("../controllers/user");
const {
  checkUserExist,getAllUsers
} = require("../controllers/middlewares/database/databaseErrorHelper");

const router = express.Router();

router.get("/",getAllUsers)
router.get("/:id",checkUserExist,getSingleUser);

module.exports = router;
