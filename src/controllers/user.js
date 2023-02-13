const Users = require('../models/users');
const passwordEncryption = require('../middlewares/passwordEncrypt');

const path = require('path');
const rootDir = path.dirname(require.main.filename);

exports.createNewUser = async (req, res) => {
    try{
        const userAccount = await Users.findOne({email : req.body.email})
        if(userAccount){
            res.status(200).send('User Already Exists!');
        }
        else{
            const userDetails = new Users(req.body);
            await userDetails.save();
            res.status(200).send('Account Created! Please Login');
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

exports.authenticateUser = async (req, res) => {
    try{
        const userAccount = await Users.findOne({email : req.body.email})
        if(userAccount){
            if(await passwordEncryption.verifyPass(req.body.password, userAccount.password)){
                res.cookie('user',userAccount.jwt);
                res.status(200).send('Account Verified!, Moving to Admin Page..');
            }else{
                res.status(401).send('Incorrect Password!');
            }
        }
        else{
            res.status(404).send('Account Not Found!');
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

exports.adminPage = async (req, res) => {
    try{
        console.log(req.cookies.user);
        if(req.cookies.user){
            res.status(200).sendFile(path.join(rootDir, 'views/UserPage', 'userPage.html'));
        }
        else{
            res.redirect('/login');
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

exports.logout = async (req, res) => {
    try{
        res.clearCookie('user');
        res.status(200).send(true);
    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}



