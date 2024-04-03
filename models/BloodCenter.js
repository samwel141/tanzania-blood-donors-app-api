const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const mongoosePaginate = require('mongoose-paginate-v2');

const bloodCenterSchema = new Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    address: {
        type: String
    },
    location: {
        type: String
    },
    region: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String
    },
    whatsapp: {
        type: String
    },
    instagram: {
        type: String
    },
    facebook: {
        type: String
    },
    twitter: {
        type: String
    }
}, {timestamps: true})

bloodCenterSchema.plugin(mongoosePaginate)
const BloodCenter = mongoose.model('bloodCenter', bloodCenterSchema)
module.exports = BloodCenter

