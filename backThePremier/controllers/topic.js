const User = require("../models/User");
const CustomError = require('../helpers/errors/CustomError');
const asyncErrorWrapper = require('express-async-handler');
const Topic = require("../models/Topic");

const getAllTopics = asyncErrorWrapper(async(req,res,next) =>{

    let query = Topic.find()

    if (req.query.search){

const searchObject = {};

const regex = new RegExp(req.query.search, "i");

searchObject["title"] = regex;

query = query.where(searchObject);

    }

    const topic = await query;

    // const topic = await Subject.find().where({title: "Mongoose validate email Syntax"});


    return(
    res
    .status(200)
    .json({
        success: true,
        data:topic
    }))
    
});

const getSingleTopic = asyncErrorWrapper(async(req,res,next) =>{

    const {id} = req.params;
    const topic = await Subject.findById(id);

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
  
    let topic = await Subject.findByIdAndUpdate(
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


module.exports = {getAllTopics,getTopic,getSingleTopic,editTopic,deleteTopic,likeTopic,unLikeTopic};