const jwt = require('jsonwebtoken');
const JWT_SCRETE = "Thisisajsonsceret";

const fetchuser = (req, res, next) =>{
    const token = req.header('auth-token');
    if(!token){
        res.send(401).send({error: "please authenticate using a valid token"});
    }

    try{
        data = jwt.verify(token, JWT_SCRETE);
        req.user = data.user;

        next();
    }
    catch(error){
        res.send(401).send({error: "please authenticate using a valid token"});
    }
}

module.exports = fetchuser;