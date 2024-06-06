
const BloodCenter = require('../models/BloodCenter');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res, next) => {

    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err) {
            return res.status(500).json({
                error: err
            });
        }
        let bloodCenter = new BloodCenter({
            name: req.body.name,
            username: req.body.username,
            address: req.body.address,
            location: req.body.location,
            region: req.body.region,
            phone: req.body.phone,
            password: hashedPass,
            whatsapp: req.body.whatsapp,
            instagram: req.body.instagram,
            facebook: req.body.facebook,
            twitter: req.body.twitter,
        });
        bloodCenter.save()
        .then(() => {
            return res.status(201).json({
                message: 'Blood Center Added successfully',
                bloodCenter
            });
        })
        .catch(error => {
            return res.status(500).json({
                message: 'An error occurred!'
            });
        });
    });
};



    // Get list of all Blood Centers
    const allBloodCenters = (req, res, next) => {
        let query = {}; 
    
        if (req.query.region) {
            query.region = req.query.region.toLowerCase();
        }

        if (req.query.search) {
            const searchRegex = new RegExp('.*' + req.query.search + '.*', 'i'); 
            query.$or = [
                { name: searchRegex },
                { username: searchRegex }
            ];
        }
    
        if (req.query.page && req.query.limit) {
            BloodCenter.paginate(query, { page: req.query.page, limit: req.query.limit })
                .then(response => {
                    res.json({
                        Blood_Centers: response
                    });
                })
                .catch(error => {
                    res.json({
                        message: "An error occurred! " + error
                    });
                });
        } else {
            BloodCenter.find(query)
                .then(response => {
                    res.json({
                        Blood_Centers: response
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
const getBloodCenterById = (req, res, next) => {
    let { id } = req.body;

    BloodCenter.findById(id)
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
const updateBloodCenter = (req, res, next) => {
    let centerID = req.body.centerID
  
    let updatedData = {
        name: req.body.name,
        username: req.body.username,
        address: req.body.address,
        location: req.body.location,
        phone: req.body.phone,
        password: hashedPass,
        whatsapp: req.body.whatsapp,
        instagram: req.body.instagram,
        facebook: req.body.facebook,
        twitter: req.body.twitter,
  
    }
  
    BloodCenter.findByIdAndUpdate(centerID, {$set: updatedData})
    .then(() => {
      res.json({
          message: 'Blood Center Updated successfully',
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
const deleteBloodCenter = (req, res, next) => {
    let centerID = req.body.centerID
    BloodCenter.findByIdAndDelete(centerID)
    .then(() => {
        res.json({
            message: 'Blood Center deleted successfully!'
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

    BloodCenter.findOne({$or: [{email:username},{username}]})
    .then(bloodCenter => {
        if(bloodCenter){
          bcrypt.compare(password, bloodCenter.password, function(err, result){
            if(err) {
                res.json({
                    error: err
                })
            }
            if(result){
                let token = jwt.sign({name: bloodCenter.name}, process.env.CENTER_ACCESS_TOKEN_SECRET, {expiresIn: process.env.CENTER_ACCESS_TOKEN_EXPIRE_TIME})
                let refreshToken = jwt.sign({name: bloodCenter.name}, process.env.CENTER_REFRESH_TOKEN_SECRET, {expiresIn: process.env.CENTER_REFRESH_TOKEN_EXPIRE_TIME})
                res.json({
                    message: 'Login Successful',
                    user: bloodCenter,
                    token,
                    refreshToken
                })
            } else{
                res.json({
                    message: 'Password does not matched!'
                })
            }
          })
        }else{
            res.json({
                message: 'No blood Center found'
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



module.exports = {
    register, 
    allBloodCenters, 
    getBloodCenterById, 
    updateBloodCenter, 
    deleteBloodCenter,
    login,
    refreshToken
}