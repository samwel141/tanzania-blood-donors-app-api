const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const mongoosePaginate = require('mongoose-paginate-v2');

const donorSchema = new Schema({
    firstname: {
        type: String
    },
    middlename: {
        type: String
    },
    sirname: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String
    },
    sex: {
        type: String
    },
    region: {
        type: String
    },
    dateOfBirth: {
        type: Date
    }
}, {timestamps: true})

donorSchema.plugin(mongoosePaginate)
const Donor = mongoose.model('donor', donorSchema)
module.exports = Donor

