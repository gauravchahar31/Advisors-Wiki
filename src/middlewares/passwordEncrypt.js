const bcrypt = require('bcryptjs')

exports.encryptPass = async (password) => {
    return await bcrypt.hash(password, 10)
}

exports.verifyPass = async (userPassword, accountPassword) => {
    const result = await bcrypt.compare(userPassword, accountPassword)
    return result
}