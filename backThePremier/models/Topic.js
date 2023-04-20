const mongoose = require("mongoose");

const slugify = require("slugify");

const {Schema} = mongoose;

const TopicSchema = new Schema({

    title : {
        type:String,
        required: [true,"Please provide a title"],
        unique:true
    },
    content : {
        type:String,
        required: [true,"Please provide a title"],
    },

    slug : String,

    createdAt: {
        type: Date,
        default: Date.now
    },
    user :{
        type: mongoose.Schema.ObjectId,
        required: true,
        ref : "User"
    },
  

    likes : [
        {
        type: mongoose.Schema.ObjectId,
        ref: "User"

    },


],

messages: [
    {
        type: mongoose.Schema.ObjectId,
        ref : "Message"
        
    }
]

 
  });
  TopicSchema.pre("save",function(next){
    if(!this.isModified("title")){
        next();
    }

    this.slug = this.makeSlug();
    next();


  })

  TopicSchema.methods.makeSlug = function(){
    return slugify(this.title, {
        replacement: '-',  // replace spaces with replacement character, defaults to `-`
        remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
        lower: true,      // convert to lower case, defaults to `false`
        strict: false,     // strip special characters except replacement, defaults to `false`
        locale: 'vi',      // language code of the locale to use
        trim: true         // trim leading and trailing replacement chars, defaults to `true`
      })

  }

  
  module.exports = mongoose.model('Topic', TopicSchema);