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





module.exports = router;