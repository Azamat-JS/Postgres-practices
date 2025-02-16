const jwt = require("jsonwebtoken");


class TokenChecker {
    checkUserToken (req, res, next) {
        const authHeader = req.headers.authorization;
      
        if (!authHeader || !authHeader.startsWith("Bearer")) {
          return next(res.status(401).json({msg: 'Unauthorized error'}));
        }
        const token = authHeader.split(" ")[1];
      
          let payload = jwt.verify(token, process.env.ACCESS_SECRET);
          req.user = {userEmail:payload.email};
          next();
      }
      
      checkAdminToken (req, res, next){
          const authHeader = req.headers.authorization
        
          if (!authHeader || !authHeader.startsWith("Bearer")) {
            return next(res.status(401).json({msg: 'Unauthorized error'}));
          }
          const token = authHeader.split(" ")[1];
            let payload = jwt.verify(token, process.env.ACCESS_SECRET);
            req.user = {userEmail:payload.email};
            if(payload.role !== "admin"){
              return next(res.status(400).json({msg: 'You are not admin'}))
            }
            next()
      }
}
module.exports = new TokenChecker();