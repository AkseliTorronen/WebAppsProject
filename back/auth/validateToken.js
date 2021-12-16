const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    const authHeader = req.headers["authorization"]; //get the token which contains a 'Bearer' before the actual jwt
    console.log(authHeader);
    let token;
    if(authHeader) {
        token = authHeader.split(" ")[1]; //seperate the token and reserve the jwt part
    } else {
        token = null;
    }
    if(token == null) return res.sendStatus(401);
    console.log("Token found");
    //after the token is found it is verified
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if(err){return res.sendStatus(403);}
        console.log(user);
        req.user = user;
        next();
    });


    
};
