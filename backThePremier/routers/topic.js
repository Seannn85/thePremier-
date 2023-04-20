const express = require('express');
const { getAllTopics , getTopic,getSingleTopic,editTopic,deleteTopic,likeTopic,unLikeTopic} = require('../controllers/topic')
const {checkTopicExist} = require("../controllers/middlewares/database/databaseErrorHelper");
const {getAccessToRoute,getTopicOwnerAccess} = require('../controllers/middlewares/authorization/auth');

const message = require("./message")


// api/topic

const router = express.Router();

router.get("/:id/like",[getAccessToRoute,checkTopicExist],likeTopic)
router.get("/:id/unlike",[getAccessToRoute,checkTopicExist],unLikeTopic)

router.get('/',getAllTopics);
router.get('/:id',checkTopicExist,getSingleTopic)
router.post('/search',getTopic);
router.put("/:id/edit",[getAccessToRoute,checkTopicExist,getTopicOwnerAccess],editTopic )
router.delete("/:id/delete",[getAccessToRoute,checkTopicExist,getTopicOwnerAccess],deleteTopic )
router.use("/:topic_id/messages",checkTopicExist,message)






module.exports = router;