const express = require('express');
const topic = require("./topic")
const auth = require("./auth")
const message = require("./message");
const user = require("./user");
const admin = require("./admin")



const router = express.Router();



router.use("/topic",topic)


router.use("/auth",auth);
router.use("/message",message);
router.use("/users",user)
router.use("/admin",admin)

router.use((req, res, next) => {
    res.status(200).json({
      success: true,
      message: "Hello World"
    });
  });
  

module.exports = router;