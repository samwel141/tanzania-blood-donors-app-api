
const Donor = require('../models/Donor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { response } = require('express');


const register = (req, res, next) => {
    console.log("Password received: ", req.body.password);
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err) {
            return res.status(500).json({
                error: err
            });
        }
        let donor = new Donor({
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            sirname: req.body.sirname,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass,
            sex: req.body.sex,
            region: req.body.region.toLowerCase(),
            dateOfBirth: req.body.dateOfBirth,
        });
        donor.save()
        .then(() => {
            return res.status(201).json({
                message: 'User Added successfully',
                user: donor
            });
        })
        .catch(error => {
            return res.status(500).json({
                message: 'An error occurred!'
            });
        });
    });
};



const allDonors = (req, res, next) => {
    let query = {}; // Initialize query object

    // Check if region parameter exists in the request params
    if (req.query.region) {
        query.region = req.query.region.toLowerCase(); 
    }

    if (req.query.search) {
        const searchRegex = new RegExp('.*' + req.query.search + '.*', 'i'); // Case-insensitive regular expression for partial search
        query.$or = [
            { firstname: searchRegex },
            { middlename: searchRegex },
            { sirname: searchRegex }
        ];
    }


    // Check if pagination parameters exist in the query string
    if (req.query.page && req.query.limit) {
        Donor.paginate(query, { page: req.query.page, limit: req.query.limit })
            .then(response => {
                res.json({
                    donors: response
                });
            })
            .catch(error => {
                res.json({
                    message: "An error occurred! " + error
                });
            });
    } else {
        Donor.find(query)
            .then(response => {
                res.json({
                    donors: response
                });
            })
            .catch(error => {
                res.json({
                    message: `An error occurred! ${error}`
                });
            });
    }
};





// Return single donor
const getDonorById = (req, res, next) => {
    let { id } = req.body;

    Donor.findById(id)
        .then(response => {
            res.json({
               donor: response
            });
        })
        .catch(error => {
            res.json({
                message: 'An error occurred!'
            });
        });
};




// Update an donor by donorId
const updateDonor = (req, res, next) => {
    let donorID = req.body.donorID
  
    let updatedData = {
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        sirname: req.body.sirname,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPass,
        sex: req.body.sex,
        region: req.body.region,
        dateOfBirth: req.body.dateOfBirth,
  
    }
  
    Donor.findByIdAndUpdate(donorID, {$set: updatedData})
    .then(() => {
      res.json({
          message: 'Donor Updated successfully',
          updatedData: updatedData
      })
    })
    .catch(error => {
      res.json({
          message: 'An Error Occured!'
      })
    })
  }
  
  

  
// Delete an Donor
const deleteDonor = (req, res, next) => {
    let donorID = req.body.donorID
    Donor.findByIdAndDelete(donorID)
    .then(() => {
        res.json({
            message: 'Donor deleted successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}





const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    Donor.findOne({$or: [{email:username},{phone:username}]})
    .then(donor => {
        if(donor){
          bcrypt.compare(password, donor.password, function(err, result){
            if(err) {
                res.json({
                    error: err
                })
            }
            if(result){
                console.log(donor.firstname)
                let token = jwt.sign({name: donor.firstname}, process.env.DONOR_ACCESS_TOKEN_SECRET, {expiresIn: process.env.DONOR_ACCESS_TOKEN_EXPIRE_TIME})
                let refreshToken = jwt.sign({name: donor.firstname}, process.env.DONOR_REFRESH_TOKEN_SECRET, {expiresIn: process.env.DONOR_REFRESH_TOKEN_EXPIRE_TIME})
                 return res.json({
                    message: 'Login Successful',
                    token,
                    refreshToken,
                    user: donor
                })
            } else{
                return res.json({
                    message: 'Password does not matched!'
                })
            }
          })
        }else{
            return res.json({
                message: 'No user found'
            })
        }
    })
}




const refreshToken = (req, res, next) => {
   const refreshToken = req.body.refreshToken
   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, function(err,decode){
    if(err){
        res.status(400).json({
            err
        })
    }
    else {
        let token = jwt.sign( {name: decode.name}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME})
        let refreshToken = req.body.refreshToken
        res.status(200).json({
            message: "Token refreshed successfully!",
            token,
            refreshToken
        })
    }
   })
}




const resetPassword = (req, res, next) =>  {
    // Generate a secure random token for password reset
function generateResetToken() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(20, (err, buf) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(buf.toString('hex'));
        });
    });
}

// Send password reset email
function sendResetEmail(email, resetToken) {
    // Configure nodemailer to send email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'samwelwilson141@gmail.com', 
            pass: 'tunz qlmq vrjx btgj'
        }
    });

    // Email content
    const mailOptions = {
        from: 'samwelwilson141@gmail.com',
        to: email,
        subject: 'Password Reset Request',
        // text: `To reset your password, please click on the following link: 

    html: `
        <div style="text-align: center; background-color: #5C500A; color: #FFFFFF; padding: 20px; border-radius: 10px;">
            <h1 style="color: #DC143C;">Tanzania Blood Donors App (TBDA)</h1>
            <h2 style="color: #DC143C;">🔐 Password Reset Request 🔐</h2>
            <p style="font-size: 18px; color: #FFFFFF">To reset your password, please click on the following link:</p>
            <a href="https://github.com/samwel141" style="background-color: #DC143C; color: #FFFFFF; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password 🔄</a>
            <p style="font-size: 18px; color:#FFFFFF">If you did not request a password reset, please ignore this email.</p>
            <p style="font-size: 18px;">Thank you! 😊</p>
        </div>
    `
    };


    return transporter.sendMail(mailOptions);
}

// Example usage:
return generateResetToken()
    .then(resetToken => {
        const email = req.body.email;
        return sendResetEmail(email, resetToken);
    })
    .then((response) => {
        console.log('Password reset email sent successfully');
       return response
    })
    .catch(err => {
        console.error('Error sending password reset email:', err);
    });
}



module.exports = {
    register, allDonors, getDonorById, updateDonor, deleteDonor, login, refreshToken, resetPassword
}