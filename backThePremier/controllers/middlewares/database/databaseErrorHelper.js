const User = require("../../../models/User");
const CustomError = require("../../../helpers/errors/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const Topic = require("../../../models/Topic");
const Message = require("../../../models/Message")


const checkUserExist = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
  
  
    const user = await User.findById(id);
  
    if(!user){
        return next(new CustomError("There is no such user with that id ",400));
    }
  
    next();
  
  });

  const checkTopicExist = asyncErrorWrapper(async (req, res, next) => {
    const topic_id  = req.params.id || req.params.topic_id;
  
  
    const topic = await Topic.findById(topic_id);
  
    if(!topic){
        return next(new CustomError("There is no such topic with that id ",400));
    }
  
    next();
  
  });


const checkTopicAndMessageExist = asyncErrorWrapper(async (req, res, next) => {
    const topic_id  = req.params.topic_id;
  
    const message_id = req.params.message_id;
  
  
    const message = await Message.findOne({
      _id: message_id,
      topic: topic_id
    })
  
    if(!message){
        return next(new CustomError("There is no message with that id associated with topic id",400));
    }
  
    next();
  
  });

  
const getAllUsers = asyncErrorWrapper(async (req, res, next) => {

    const users = await User.find();


    return res.status(200)
    .json({
        success:true,
        data:users
    })
   
  
  });


module.exports = {
    checkUserExist,getAllUsers,checkTopicExist,checkTopicAndMessageExist
}