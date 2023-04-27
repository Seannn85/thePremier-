const CustomError = require("../../../helpers/errors/CustomError");
const jwt = require("jsonwebtoken");
const {
  isTokenIncluded,
  getAccessTokenFromHeader,
} = require("../../../helpers/authorization/tokenHelpers");
const asyncErrorWrapper = require("express-async-handler");
const User = require("../../../models/User");
const Topic = require("../../../models/Topic");
const Message = require("../../../models/Message");


const getAccessToRoute = (req,res,next) =>{
    const { JWT_SECRET } = process.env;


    if(!isTokenIncluded(req)){
        return next(
            new CustomError("You are not authorized to access this route",401)
        );
    }

    const accessToken = getAccessTokenFromHeader(req);

    jwt.verify(accessToken,JWT_SECRET,(err,decoded)=>{
        if(err){
            return next(
                new CustomError("You are not authorized to access this route",401)
            )
        }

        req.user = {
            id: decoded.id,
            name: decoded.name,
        };

        next();
    })

};

const getAdminAccess = asyncErrorWrapper(async (req, res, next) => {
    
    const {id} = req.user;

    const user = await User.findById(id);


    if(user.role !== 'admin'){
        return next(new CustomError("Only Admins can access this route",403))
    }

    next();

});

const getTopicOwnerAccess = asyncErrorWrapper(async (req, res, next) => {

    const userId = req.user.id;
    const topicId = req.params.id;
  
      
  const subject = await Topic.findById(topicId)
  
    if (subject.user != userId){
  
      return next(new CustomError("Only owner can handle this operation",403))
    }
  
  
    
    next();
  
  });

  const getMessageOwnerAccess = asyncErrorWrapper(async (req, res, next) => {

    const userId = req.user.id;
    const messageId = req.params.message_id;
  
      
  const message = await Message.findById(messageId)
  
    if (message.user != userId){
  
      return next(new CustomError("Only owner can handle this operation",403))
    }
  
  
    
    next();
  
  });

  module.exports = {
    getAccessToRoute, getAdminAccess,getTopicOwnerAccess,getMessageOwnerAccess
  };
  