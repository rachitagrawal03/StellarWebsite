import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
    // const token = req.header('auth-token');
    const {token} = req.headers;
    if(!token){
        return res.json({successs: false, message: "Not Authorized Login Again"})
    }

    try{
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id;
        next();
    } catch(error){
        console.log(error);
        res.json({success: false, message: "Error"});
    }

}

// creating middleware to fetch user based on auth token
// const fetchUser = async (req, res, next) => {
//     if(!token){
//         res.status(401).send({errors: "Please authenticate valid token"})
//     }else{
//         try {
//             const data = jwt.verify(token, process.env.JWT_SECRET);
//             req.user = data.user;
//             next();
//         } catch (error) {
//             res.status(401).send({errors: "Please authenticate valid token"})    
//         }
//     }
// }

export default authMiddleware;