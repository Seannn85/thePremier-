const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken")

const crypto = require("crypto");
const CustomError = require("../helpers/errors/CustomError")

const mongoose = require("mongoose");

const Topic = require("./Topic");
const {Schema} = mongoose;


const UserSchema = new Schema({

name : {
    type:String,
    required: [true, "Please provide a name"]
},

email :{
    type: String,
    required: true,

},

username :{
    type: String,
    required: true,
    unique: true
},

role : {
    type: String,
    default: "user",
    enum: ["user","admin"]
},

password :{
    type: String,
    minlength: [6,"Please provide a password with minimum length 6"],
    required: [true, "Please provide a password"],
    select: false
},

createdAt :{
    type: Date,
    default: Date.now
},

title: {
    type: String
},

about : {
    type: String
},

website : {
    type : String
},

profile_image :{

    type : String,
    default : "default.jpg"
},

resetPasswordToken :{

    type:String,
},

resetPasswordExpire: {

    type:Date,
},

blocked : {
    type : Boolean,
    default : false
}

});


UserSchema.methods.generateJwtFromUser = function (){

    const {JWT_SECRET,JWT_EXPIRE} = process.env;
    const payload = {
        id: this._id,
        name: this.name
    };

    const token = jwt.sign(payload, JWT_SECRET,{
        expiresIn: JWT_EXPIRE
    });

    return token

};


UserSchema.methods.getResetPasswordTokenFromUser = function(){
    const randomHexString = crypto.randomBytes(15).toString("hex");
    const {RESET_PASSWORD_EXPIRE}=process.env
    console.log(randomHexString);

    const resetPasswordToken = crypto
    .createHash("SHA256")
    .update(randomHexString)
    .digest("hex");

    this.resetPasswordToken = resetPasswordToken,
    this.resetPasswordExpire = Date.now()+parseInt(RESET_PASSWORD_EXPIRE);


    return resetPasswordToken;
};


UserSchema.pre("save", async function(next){

if (!this.isModified("password")){

    next();
}

try {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password,salt);
    this.password=hashedPassword;
    next();
} catch (error){
    next(error);
}


}
);
UserSchema.methods.comparePasswords = async function(password){

    try{
        return await bcrypt.compare(password,this.password);
    }catch(error){
        return next(new CustomError("Please check your passsword",400))
    }
};

UserSchema.post("remove", async function(){

    await Topic.deleteMany({
        user: this._id
    })
})


module.exports = mongoose.model("User",UserSchema)


