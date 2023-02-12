const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.createJWT = async (userData) => {
    try{
        const token = jwt.sign(userData, process.env.JWT_SK)
        return token
    }
    catch(err){
        console.log("JWT Generation Error : " + err)
    }
}

exports.verifyJWT = async (userToken) => {
    try{
        const token = await jwt.verify(userToken, process.env.JWT_SK)
        return token
    }
    catch(err){
        console.log("JWT Verification Error : " + err)
    }
}