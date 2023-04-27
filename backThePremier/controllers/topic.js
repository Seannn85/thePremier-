const User = require("../models/User");
const CustomError = require('../helpers/errors/CustomError');
const asyncErrorWrapper = require('express-async-handler');
const Topic = require("../models/Topic");
const Message = require("../models/Message")

const getAllTopics = asyncErrorWrapper(async(req,res,next) =>{

    let query = Topic.find()

    if (req.query.search){

const searchObject = {};

const regex = new RegExp(req.query.search, "i");

searchObject["title"] = regex;

query = query.where(searchObject);

    }

    const topic = await query.populate("messages");


    return(
    res
    .status(200)
    .json({
        success: true,
        data:topic
    }))
    
});

const addNewTopic = asyncErrorWrapper(async (req,res,next)=>{

    
 
    const information = req.body;


    const existingTopic = await Topic.findOne({
        title: { $regex: new RegExp(`^${information.title}$`, 'i') },
      });
      
      if (existingTopic) {

        console.log("Existing Topic vaaar ")
        return res.status(200).json({
          success: true,
          message: 'Topic already exists',
          data : existingTopic,
        //   id:Topic._id

        });
      }


    const topic = await Topic.create({
        ...information,
        user:req.user.id
    });


    res.status(200).json({
        success: true,
        data:topic

    })




})


const searchNewTopic = asyncErrorWrapper(async (req,res,next)=>{

    
 
    const information = req.body;



    const existingTopic = await Topic.findOne({
        title: { $regex: new RegExp(`^${information.title}$`, 'i') },
      }).populate('messages');
      ;
      
      if (existingTopic) {

 
        console.log("Existing Topic vaaar ");
        console.log(existingTopic);
        return res.status(200).json({
          success: true,
          message: 'Topic already exists',
          data: existingTopic,
          //   id:Topic._id

        });
      }


      return res.status(200).json({
        success: true,
        data: 'No topic found',
      });



})
const userSearchNewTopic = asyncErrorWrapper(async (req,res,next)=>{

    
 

    const query = req.query.q;


    const existingTopic = await Topic.findOne({
        title: { $regex: new RegExp(`^${query}$`, 'i') },
      });
      
      if (existingTopic) {

        const topic = await Topic.findOne({
            title: { $regex: new RegExp(`^${query}$`, 'i') },
          })
          .populate({
            path: "user",
            select: "name profile_image",
          })
          .populate({
            path: "messages",
            select: "content user createdAt likes",
            populate: {
              path: "user",
              select: "name profile_image",
            },
          });

        console.log("Existing Topic vaaar ");
        console.log(topic);
        return res.status(200).json({
          success: true,
          message: 'Topic already exists',
          data: topic,
          //   id:Topic._id

        });
      }


      return res.status(200).json({
        success: true,
        data: 'No topic found',
      });



})

const getSingleTopic = asyncErrorWrapper(async(req,res,next) =>{

    const {id} = req.params;
    const topic = await Topic.findById(id);

    return(
    res
    .status(200)
    .json({
        success: true,
        data:topic
    }))
    
});


const editTopic = asyncErrorWrapper(async(req,res,next) =>{

    const {id} = req.params;
   const {title,content} = req.body;


   let topic = await Topic.findById(id);

   topic.title = title;
   topic.content = content;

   topic = await topic.save();

    return(
    res
    .status(200)
    .json({
        success: true,
        data:topic
    }))
    
});


const getTopic = (req,res,next)=>{

    console.log("Naptin ortak")

    res
    .status(200)
    .json({
        success: true
    });


}
const deleteTopic = asyncErrorWrapper(async(req,res,next) =>{
    const {id} = req.params

    await Topic.findByIdAndDelete(id)

    res
    .status(200)
    .json({
        success: true,
        message: "Topic Delete Operation Successfull"
    });


})

const likeTopic = asyncErrorWrapper(async(req,res,next) =>{
    const {id} = req.params;
    const userId = req.user.id;
  

    const subject = await Topic.findById(id);

    if(subject.likes.includes(req.user.id)){
        return next(new CustomError("You have already like this topic",400));
    }
  
    let topic = await Topic.findByIdAndUpdate(
        id,
        { $addToSet: { likes: userId } },
        { new: true, runValidators: false, fields: { likes: 1 } }
      );
    

 
    
    try {
      
    await topic.save();

    return res.status(200).json({
            success: true,
            data: topic
        });
    } catch (err) {
        return next(new CustomError(`${err.message}`, 400));
    }


})

const unLikeTopic = asyncErrorWrapper(async(req,res,next) =>{
    const {id} = req.params;
  
    // const topic = await Subject.findById(id);
    const subject = await Topic.findById(id);
    if(!subject.likes.includes(req.user.id)){
        return next(new CustomError("You cannot undo like operation for this question",400));
    }

    const topic = await Topic.updateOne(
        { _id: id, likes: req.user.id },
        { $pull: { likes: req.user.id } }
      );



  return res.status(200).json({
    success: true,
    data: topic
});




})


module.exports = {getAllTopics,getTopic,getSingleTopic,editTopic,deleteTopic,likeTopic,unLikeTopic,addNewTopic,searchNewTopic,userSearchNewTopic};