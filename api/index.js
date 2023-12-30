const express = require ('express');
const mongoose = require ('mongoose');
const dotenv = require ('dotenv');
const jwt = require ('jsonwebtoken');
const cors = require('cors');
const User = require ('./models/User');
dotenv.config();
mongoose.connect(process.env.MONGO_URL);

const JWTSecret = process.env.JWT_SECRET;

const app = express ();
app.use(express.json());

// Midleware
app.use(cors({
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  origin: process.env.CLIENT_URL,
}));


app.get ('/test',(req,res) =>{
 res.json({name: "zara", Subscribe: true});
});

app.post ('/register', async (req,res) =>{
  try{ const {username,password}= req.body;
  const createdUser =  await User.create({username,password});
    jwt.sign({userId:createdUser._id},JWTSecret, (err,token) => {
     if(err) throw err;
     res.cookie('token',token).status(201).json('ok');
    });
  }catch(err){
    if (err) throw err;
  }
 
});

app.listen(4040, () => console.log("server is lintening on 4040"));




//JFVEYya4egTvMQGq
