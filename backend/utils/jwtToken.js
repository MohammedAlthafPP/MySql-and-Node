//Creating Token and Saving in Cookie
const sendToken = (data,statusCode,res,token,message) => {
    const {password,...user}=data;
    //options for cookie 
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 *60*60*1000),
        httpOnly:true
    };

    res.status(statusCode).cookie("token",token,options).json({
        success: true,
        message,
        user,
        token,
    });
};


module.exports = sendToken