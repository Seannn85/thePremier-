

const mongoose = require("mongoose");
const Topic = require("./Topic");
const {Schema} = mongoose;


const MessageSchema = new Schema({
    content : {
      type:String,
      required:[true, "Please provide a content"],
    },
    createdAt : {
      type : Date,
      default: Date.now
    },
    likes : [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User"
      }
    ],
    user : {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true

    },
    topic : {
      type: mongoose.Schema.ObjectId,
      ref: "Topic",
      required: true

    }

});


MessageSchema.pre("save", async function(next){
  if (!this.isModified("user")) return next();


  try {

  

    const topic = await Topic.findByIdAndUpdate(
      this.topic, 
      { $push: { messages: this._id } },
      { new: true }
    );

    console.log(this.topic)
   
  
    next();

  }
  catch(err){
    return next(err);
  }
 
})



module.exports = mongoose.model("Message", MessageSchema);