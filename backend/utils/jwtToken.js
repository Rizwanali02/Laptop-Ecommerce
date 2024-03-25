const sendToken = (user, statusCode, message, res) => {
    const token = user.getJWTToken();
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      domain:"https://laptop-ecommerce-0czh.onrender.com"
    
    };
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      message,
      token,
    });
  };
  
  export { sendToken }


// const sendToken = (user, statusCode, message, res) => {
//   const token = user.getJWTToken();
//   res.status(statusCode).header("Authorization", "Bearer " + token).json({
//       success: true,
//       user,
//       message,
//       token,
//   });
// };

// export { sendToken };