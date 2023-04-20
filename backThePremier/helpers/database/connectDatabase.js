const mongoose = require('mongoose');


const connectDatabase = () =>{

    mongoose.set("strictQuery", false);


    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDb Connection Successful");
    })
    .catch(err=>{
        console.error(err);
    })


};


module.exports = connectDatabase;
