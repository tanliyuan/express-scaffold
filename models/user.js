var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema  = new Schema({
    name: String,
    age: Number,
    createDate: {
        type: Date,
        default: Date.now
    },
    modifiedDate: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'users'
});

module.exports = mongoose.model('User', UserSchema);