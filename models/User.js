const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
    email: {
        type: String, 
        required: [true, `A valid email address is required.`], 
        unique: [true, `This email is already registered.`],
        validate: {
            validator: function(email) {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
            }, 
            messge: `Not a valid email address. Try again.`
        }
    },
    username: {
        type: String,
        required: [true, `A valid username is required.`],
        unique: [true, `This username is already registered.`],
        minlength: [5, `A username must be at least 5 characters long.`],
        maxlength: [25, `A username cannot be more than 25 characters long.`]
    }, 
    password: {
        type: String,
        required: [true, `A password is required.`],
        minlength: [8, `Password must be at least 8 characters long.`]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        required: true
    },
    aspirations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Aspiration"
        }
    ]
});

//Hash the password before saving it. 
UserSchema.pre("save", function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    //Hash the password using bcrypt.
    bcrypt.hash(this.password, 10, (error, hashedPassword) => {
        if(error) {
            return next(error);
        }
        this.password = hashedPassword;
        next();
    });
});

UserSchema.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, (error, isMatch) => {
        if(error) {
            return callback(error);
        } else {
            if(!isMatch) {
                return callback(null, isMatch);
            }
            //Attach the user object with the request object.
            return callback(null, this);
        } 
    });
}

module.exports = mongoose.model("User", UserSchema);