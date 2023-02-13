const Advisory = require('../models/advisory');
const User = require('../models/users');

exports.createNewAdvisory = async (req, res) => {
    try{
        const advisory = await Advisory.findOne({name: req.body.name});
        if(advisory){
            res.status(409).send('Advisory Already Exists');
        }else{
            const user = await User.findOne({jwt: req.cookies.user});
            const newAdvisory = new Advisory({
                name: req.body.name,
                description: req.body.description,
                userId: user._id
            })
            await newAdvisory.save();
            res.status(201).json(newAdvisory);
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

exports.getAdvisories = async (req, res) => {
    try{
        const advisories = await Advisory.find({});
        res.status(200).json(advisories);
    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

exports.getUserAdvisories = async (req, res) => {
    try{
        if(req.cookies.user){
            const user = await User.findOne({jwt: req.cookies.user});
            const userAdvisories = await Advisory.find({userId: user._id});
            res.status(201).json(userAdvisories);
        }
        else{
            res.status(401).send('Unauthorized Access');
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

exports.deleteAdvisory = async (req, res) => {
    try{
        const advisoryId = req.query.advisoryId;
        const advisory = await Advisory.findById(advisoryId);
        const user = await User.findOne({jwt: req.cookies.user});
        if(advisory.userId.equals(user._id)){
            await Advisory.findByIdAndDelete(advisoryId);
            res.status(200).send(true);
        }else{
            res.status(401).send('Unauthorized Access');
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

exports.updateAdvisory = async (req, res) => {
    try{
        const advisoryId = req.body.advisoryId;
        const advisory = await Advisory.findById(advisoryId);
        const user = await User.findOne({jwt: req.cookies.user});
        if(advisory.userId.equals(user._id)){
            await Advisory.updateOne({ _id: advisoryId}, {
                name: req.body.name,
                description: req.body.description
            });
            res.status(200).send(true);
        }else{
            res.status(401).send('Unauthorized Access');
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}
