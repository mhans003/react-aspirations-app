//Require Mongoose and create Schema for a aspiration.
const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const aspirationSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        maxlength: 250
    },
    date: {
        type: Date,
        default: Date.now
    },
    milestones: {
        type: Array
    },
    status: {
        type: String,
        enum: ["In Progress", "Achieved"],
        required: true
    }
});

//Create and export the Post model variable.
const Aspiration = mongoose.model("Aspiration", aspirationSchema);

module.exports = Aspiration;