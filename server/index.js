const express = require ("express");
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/Users');

const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb://Vishnu:Swarnam89@cluster0-shard-00-00.ywt8l.mongodb.net:27017,cluster0-shard-00-01.ywt8l.mongodb.net:27017,cluster0-shard-00-02.ywt8l.mongodb.net:27017/mernTutorial?ssl=true&replicaSet=atlas-108wxz-shard-0&authSource=admin&retryWrites=true&w=majority"
);

app.get("/getUsers", (req, res)=>{
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else{
            res.json(result);
        }
    });
});

app.post("/createUser", async (req,res) => {
    const user = req.body
    const newUser = new UserModel(user);
    await newUser.save();

    res.json(user)
});

app.listen(3001,  () => {
    console.log("SERVER RUNS PERFECTLY!");
})