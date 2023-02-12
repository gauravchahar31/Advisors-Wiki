const path = require('path');
const rootDir = path.dirname(require.main.filename);

exports.homePage = (req, res) => {
    res.status(200).sendFile(path.join(rootDir, 'views/HomePage', 'index.html'));
}

exports.loginPage = (req, res) => {
    res.status(200).sendFile(path.join(rootDir, 'views/LoginPage', 'login.html'));
}

exports.signupPage = (req, res) => {
    res.status(200).sendFile(path.join(rootDir, 'views/SignupPage', 'signup.html'));
}
