const CustomError = require('../helpers/errors/CustomError');
const asyncErrorWrapper = require('express-async-handler');

const Message = require('../models/Message');
const Topic = require('../models/Topic');



  const addNewMessageToTopic = async(req,res,next)=>{

      const {topic_id} = req.params;

      const user_id = req.user.id;


      const information = req.body;


      const message = await Message.create({
        ...information,
        topic: topic_id,
        user: user_id
      })

      const all = await Message.findById(message);

      console.log(req)
      return res.status(200)
      .json({
        success: true,
        data: message
      });
      

  }

  const getAllMessagesByTopic = async(req,res,next)=>{

    const {topic_id} = req.params;

    const topic = await Topic.findById(topic_id).populate("messages");

    const messages = topic.messages

    return res.status(200)
    .json({
      success:true,

      count : messages.length,
      data:messages
    })

}


const getSingleMessage = asyncErrorWrapper(async (req,res,next)=>{


  const {message_id} = req.params;

  const message = await Message
  .findById(message_id)
  .populate(
    {
      path : "topic",
      select: "name"
    }
  )
  .populate(
    {
      path : "user",
      select: "name profile_image"
    }
  );

  res.status(200)
  .json({
      success: true,
      data:message

  })




})


const editMessage = asyncErrorWrapper(async (req,res,next)=>{


  const {message_id} = req.params;

  const {content} = req.body;

  let message = await Message.findById(message_id);

  message.content = content;

  await message.save();

  res.status(200)
  .json({
      success: true,
      data:message

  })




})

const deleteMessage = asyncErrorWrapper(async (req,res,next)=>{


  const {message_id} = req.params;

  const {topic_id} = req.params;

  await Message.findByIdAndRemove(message_id)




  const topic = await Subject.findById(topic_id);

  
  topic.messages.splice(topic.messages.indexOf(message_id),1);

  await topic.save()


  res.status(200)
  .json({
      success: true,
      message:"Answer deleted successfully"

  })




})

const likeMessage = asyncErrorWrapper(async(req,res,next) =>{
  const {message_id} = req.params;
  const userId = req.user.id;


  const message = await Message.findById(message_id);

  if(message.likes.includes(req.user.id)){
      return next(new CustomError("You have already like this topic",400));
  }

  let like = await Message.findByIdAndUpdate(
      message_id,
      { $addToSet: { likes: userId } },
      { new: true, runValidators: false, fields: { likes: 1 } }
    );
  


  
  try {
    
  await like.save();

  return res.status(200).json({
          success: true,
          data: message
      });
  } catch (err) {
      return next(new CustomError(`${err.message}`, 400));
  }


})

const unLikeMessage = asyncErrorWrapper(async(req,res,next) =>{
  const {message_id} = req.params;


  // const topic = await Subject.findById(id);
  const message = await Subject.findById(message_id);
  if(!message.likes.includes(req.user.id)){
      return next(new CustomError("You cannot undo like operation for this answer",400));
  }

  const unlike = await Message.updateOne(
      { _id: message_id, likes: req.user.id },
      { $pull: { likes: req.user.id } }
    );



return res.status(200).json({
  success: true,
  data: unlike
});




})





  module.exports = {addNewMessageToTopic,getAllMessagesByTopic,getSingleMessage,editMessage,deleteMessage,likeMessage,unLikeMessage};