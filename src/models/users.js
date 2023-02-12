const mongoose = require('mongoose')
const encryption = require('../middlewares/passwordEncrypt')
const jwt = require('../helpers/jwtHandler');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique : true
    },
    password: {
        type: String,
        required: true
    },
    jwt: {
        type: String,
        required: true
    }
})

userSchema.pre("validate", async function (next){
    this.jwt = await jwt.createJWT(this.email)
    next()
})

userSchema.pre("save", async function (next){
    if(this.isModified('password')){
        const encryptedPassword = await encryption.encryptPass(this.password);
        this.password = encryptedPassword
    }
    next()
})

const Users = new mongoose.model("User", userSchema)

module.exports = Users