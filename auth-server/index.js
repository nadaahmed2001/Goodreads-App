const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors");
const UserModel = require("./models/user");

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/user")

app.post('/login',(req,res) => {
   const {email , password} = req.body
   UserModel.findOne({ email: email})
   .then((user) => {
    if(user)
    {
        if(user.password === password){
            res.json("success")
        }
        else {
            res.json("Incorrect password")
        }
    }
    else {
        res.json("User not found")
    }

   }) 

    })
    
    app.post('/register', (req, res) => {
        // Check if user already exists (by email in this case)
        UserModel.findOne({ email: req.body.email })
          .then(existingUser => {
            if (existingUser) {
              // If user exists, return an error message
              return res.json("Email Already Exist");
            }
      
            // If user doesn't exist, create a new user
            UserModel.create(req.body)
              .then(user => res.json(user))  // Respond with the created user
              .catch(err => res.status(500).json({ error: err.message }));  // Handle any errors
          })
          .catch(err => res.status(500).json({ error: err.message }));  // Handle errors in finding the user
      });
      

app.listen(3001,() => {
    console.log("Server is running on port 3001")
})