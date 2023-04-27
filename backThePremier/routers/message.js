const express = require('express');


const router = express.Router({mergeParams:true});

const {getAccessToRoute,getMessageOwnerAccess} = require('../controllers/middlewares/authorization/auth')
const {checkTopicAndMessageExist}= require("../controllers/middlewares/database/databaseErrorHelper");
const {addNewMessageToTopic,getAllMessagesByTopic,getSingleMessage,editMessage,deleteMessage,likeMessage,unLikeMessage} = require('../controllers/message')
router.post("/",getAccessToRoute,addNewMessageToTopic);

router.get("/:slug/messages",getAllMessagesByTopic);
router.get("/:message_id",checkTopicAndMessageExist, getSingleMessage);
router.put("/:message_id/edit",[checkTopicAndMessageExist,getAccessToRoute,getMessageOwnerAccess], editMessage);
router.get("/:message_id/like",[checkTopicAndMessageExist,getAccessToRoute], likeMessage);
router.get("/:message_id/unlike",[checkTopicAndMessageExist,getAccessToRoute], unLikeMessage);
router.delete("/:message_id/delete",[checkTopicAndMessageExist,getAccessToRoute,getMessageOwnerAccess], deleteMessage);

module.exports = router;