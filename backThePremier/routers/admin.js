const express = require("express");
const {getAccessToRoute, getAdminAccess} = require("../controllers/middlewares/authorization/auth");
const {blockUser,deleteUser} =require("../controllers/admin");
const { checkUserExist } = require("../controllers/middlewares/database/databaseErrorHelper");



//Block User
//Delete User
const router = express.Router();

router.use([getAccessToRoute,getAdminAccess]);

router.get("/", (req,res,next)=>{


    res.status(200)
    .json({
        success: true,
        message : "Admin Page"
    })
})


router.get("/block/:id",checkUserExist, blockUser)
router.delete("/user/:id",checkUserExist, deleteUser)


module.exports = router;