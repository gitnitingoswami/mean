const express = require('express');
const router = express.Router();
const User = require('../user');
const bcrpt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const user = require('../user');




router.post('/singUp', (req, res, next) => {

    bcrpt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                Email: req.body.email,
                Password: hash,

            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: "user is created",
                        result: result

                    });
                }).catch(err => {
                    res.status(501).json({
                        error: err,

                    });
                })

        });




});

/*bcrpt.hash(req.body.password,10).then(hash=>{
    const user = new User({
        Name: req.body.name,
        Email:req.body.email,
        Password:hash,

    });
    user.save().then((results)=>{
        res.status(201).json({
            message:'user',
            result:results
        });
    })
    


}).catch((err)=>{
res.status(501).json({
    error:err
})
});*/






router.post('/login', (req,res,next) => {
    console.log("nitin" + req.body.email)
    let fetchUser
    User.findOne({ Email: req.body.email })

        .then((user) => {

            if (!user) {
                return res.status(401).json({
                    message: 'auth faild',
                                           });
                        }

            fetchUser = user;
           return bcrpt.compare(req.body.password,user.Password)
        }
        )
        
        .then((result) => {
            console.log("user is found");
            
            if (!result) {
                return res.status(401).json({
                    message: "auth faild"

                })

            }
            console.log("working");

           const token = jwt.sign({ Email: fetchUser.Email, userId: fetchUser._id }, "this_is_secret_password", { expiresIn: "1h" });
            console.log("tokenis" + token);
          return res.status(201).json({
              message:"sucrddgiul",
                token: token
            })

        }
        ).catch(err=>{
            res.status(400).json({
                message:"err"
            })
        })

       
});




module.exports = router;