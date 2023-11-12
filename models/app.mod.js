const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String},
    age: {type: Number},
    isReg: {type: Boolean}
});

const User = mongoose.model('user', userSchema);
module.exports = User;