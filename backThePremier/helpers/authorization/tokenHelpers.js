


const sendJwtToClient = (user,res) => {
 


    const token = user.generateJwtFromUser();

    const {JWT_COOKIE, NODE_ENV} = process.env
   return res.status(201)
   .cookie("access_token",token,{
    httpOnly: true,
    expires: new Date(Date.now() + parseInt(JWT_COOKIE)*1000*60),
    secure : NODE_ENV === "development" ? false : true

   })
   .json({
    success: true,
    access_token : token,
    data : {
        name: user.name,
        email : user.email

    }
   });
  
}


const isTokenIncluded = (req)=>{
    const tokenIncluded = req.headers.authorization && req.headers.authorization.startsWith("Bearer");

    console.log('Is token included in request headers? ', tokenIncluded);
    return (
        req.headers.authorization && req.headers.authorization.startsWith("Bearer")
        
        )
}

const getAccessTokenFromHeader = (req) =>{

    const authorization = req.headers.authorization;
    const access_token = authorization.split(" ")[1];

    return access_token;
}

module.exports = {sendJwtToClient, isTokenIncluded, getAccessTokenFromHeader}