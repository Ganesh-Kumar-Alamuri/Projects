const jwt = require('jsonwebtoken')
const authorizationMiddleware = (req,res,next) => {

    const Authorization = req.headers.authorization
    if(!Authorization || !Authorization.startsWith("Bearer "))
        throw new customAPIError("Not Authorized",400)
    const token = Authorization.split(" ")[1]
    
    const revTOken = jwt.verify(token,process.env.SECRET)
    req.user ={ username: revTOken.username, id: revTOken.id}
    next()
}
module.exports = authorizationMiddleware