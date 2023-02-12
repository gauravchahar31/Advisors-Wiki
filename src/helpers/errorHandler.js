function errorHandler (err){
    if(err.code == 11000){
        return "Account Already Exists"
    }
}

module.exports = errorHandler