const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('dotenv').config()
require('./src/config/database')

const app = express()
const port = process.env.PORT;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cookieParser());

app.use(express.static('views'));

const homeRoutes = require('./src/routes/home');
const userRoutes = require('./src/routes/user');

app.use('/user', userRoutes);
app.use(homeRoutes);


app.listen(process.env.PORT, (err) => {
    if(err){
        console.log("Server Error : " + err)
    }
    else{
        console.log(`Server Connected at Port ${port}`)
    }
})