const express = require('express');
// /api/auth
const {register,logout ,getUser, loginFunction,imageUpload,forgotPassword,resetPassword,editDetails} = require('../controllers/auth');
const {getAccessToRoute} = require('../controllers/middlewares/authorization/auth')
const router = express.Router();
const profileImageUpload = require("../controllers/middlewares/libraries/profileImageUpload");


router.post("/register",register);
// router.post("/logout",logout);
router.get("/profile",getAccessToRoute ,getUser);
router.post("/logout",getAccessToRoute ,logout);
router.post("/login",loginFunction);
router.put('/resetpassword',resetPassword)
router.post("/upload",[getAccessToRoute,profileImageUpload.single("profile_image")],imageUpload);
router.post("/forgotpassword",forgotPassword);
router.put("/edit",getAccessToRoute,editDetails)


module.exports = router;