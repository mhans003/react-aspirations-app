const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const Aspiration = require("../models/Aspiration");
const { request, response } = require("express");

//When logging in, use the user ID to return a JWT token.
const signToken = userID => {
    return JWT.sign({
        //Set issuer to our secret; Set subject to our user name.
        iss: process.env.JWT_SECRET,
        sub: userID
    }, process.env.JWT_SECRET, {expiresIn: "1hr"});
};

//Register a new user.
userRouter.post("/register", (request, response) => {
    //Pull out the credential information from the request body.
    const { username, password, email, role } = request.body;
    //See if this username exists.
    User.findOne({username}, (error, user) => {
        if(error) {
            //If there was an error, indicate that something went wrong.
            response.status(500).json(
                {
                    message: {
                        msgBody: "An error occured while searching for username.", 
                        msgError: true
                    }
                }
            );
        }
        if(user) {
            //If the user exists (and therefore user object is returned):
            response.status(400).json(
                {
                    message: {
                        msgBody: "An error occured", 
                        msgError: true
                    }
                }
            );
        } else {
            //Otherwise, create the user using the new credentials.
            const newUser = new User({email, username, password, role:"user"});
            console.log(newUser);
            newUser.save(error => {
                if(error) {
                    console.log(error);
                    response.status(500).json(
                        {
                            message: {
                                msgBody: "An error occured while registering user.", 
                                msgError: true
                            }
                        }
                    );
                } else {
                    response.status(200).json(
                        {
                            message: {
                                msgBody: "Successfully registered new user.",
                                msgError: false
                            }
                        }
                    )
                }
            });
        }
    })
});

//Log an existing user in (must authenticate).
userRouter.post("/login", passport.authenticate("local", {session: false}), (request, response) => {
    if(request.isAuthenticated()) {
        //If the user is authenticated, pull out the credentials of that user.
        const { _id, username, role } = request.user;
        //Create a JWT token since we have signed in.
        const token = signToken(_id);
        //Using the JWT token, set cookie and send authorization.
        response.cookie("access_token", token, {httpOnly: true, sameSite: true});
        response.status(200).json(
            {
                isAuthenticated: true, 
                user: { username, role }
            }
        );
    } else {
        response.status(401).json(
            {
                message: {
                    msgBody: "Incorrect username or password.",
                    msgError: true
                }
            }
        );
    }
});

//Log a user out using the associated access token.
userRouter.get("/logout", passport.authenticate("jwt", {session: false}), (request, response) => {
    response.clearCookie("access_token");
    response.json(
        {
            user: {
                username: "", 
                role: ""
            }, 
            success: true
        }
    );
});

//Create a new aspiration for an existing user.
userRouter.post("/aspiration", passport.authenticate("jwt", {session: false}), (request, response) => {
    //Create the instance of the new aspiration using the request body.
    console.log(request.body);
    const aspiration = new Aspiration({...request.body, status: "In Progress"});
    //Save this new aspiration. 
    aspiration.save(error => {
        if(error) {
            response.status(500).json(
                {
                    message: {
                        msgBody: "An error occured", 
                        msgError: true
                    }
                }
            );
        } else {
            //If there is no error, push this new aspiration to the aspirations array of the logged in user.
            request.user.aspirations.push(aspiration);
            request.user.save(error => {
                if(error) {
                    response.status(500).json(
                        {
                            message: {
                                msgBody: "An error occured", 
                                msgError: true
                            }
                        }
                    );
                } else {
                    //Confirm that the new aspiration was created and pushed to the user.
                    response.status(200).json(
                        {
                            message: {
                                msgBody: `Created new aspiration for user ${request.user.username}.`,
                                msgError: false
                            }
                        }
                    );
                }
            });
        }
    })
});

//Create a new milestone for an existing aspiration.
userRouter.put("/aspiration/:id", passport.authenticate("jwt", {session: false}), (request, response) => {
    //Create the instance of the new aspiration using the request body.
    console.log(request.body);
    console.log(request.params.id);
    Aspiration.updateOne(
        {_id: request.params.id},
        {$push: {milestones: request.body}}
    ).then(result => {
        console.log(result);
        response.json(result);
    }).catch(error => {
        response.json(error);
    });
});

//Delete a milestone from an existing aspiration.
userRouter.delete("/aspiration/:id", passport.authenticate("jwt", {session: false}), (request, response) => {
    console.log(request.params.id);
    console.log(request.body.id);
    Aspiration.updateOne(
        {_id: request.params.id},
        {$pull: {milestones: {id: request.body.id}}}
    ).then(result => {
        console.log(result);
        response.json(result);
    }).catch(error => {
        response.json(error);
    });

    /*
    console.log(request.body);
    console.log(request.params.id);
    Aspiration.updateOne(
        {_id: request.params.id},
        {$push: {milestones: request.body}}
    ).then(result => {
        console.log(result);
        response.json(result);
    })
    .catch(error => {
        response.json(error);
    });
    */
});

//Get all aspirations for a user.
userRouter.get("/aspirations", passport.authenticate("jwt", {session: false}), (request, response) => {
    //Using the loggged in user's ID, find and populate the aspirations array.
    User.findById({_id: request.user._id})
        .populate("aspirations")
        .exec((error, document) => {
            if(error) {
                response.status(500).json(
                    {
                        message: {
                            msgBody: "An error occured", 
                            msgError: true
                        }
                    }
                );
            } else {
                //The aspirations array will be populated using the returned document.
                response.status(200).json(
                    {
                        aspirations: document.aspirations, 
                        authenticated: true
                    }
                );
            }
        });
});

//Log in to the admin panel if authenticated.
userRouter.get("/admin", passport.authenticate("jwt", {session: false}), (request, response) => {
    //If the current user is an admin, authorize the account.
    if(request.user.role === "admin") {
        response.status(200).json(
            {
                message: {
                    msgBody: "Admin Account",
                    msgError: false
                }
            }
        );
    } else {
        response.status(403).json(
            {
                message: {
                    msgBody: "Account Not Authorized",
                    msgError: true
                }
            }
        );
    }
});

//Allow the user to remain authenticated.
userRouter.get("/authenticated", passport.authenticate("jwt", {session: false}), (request, response) => {
    const { username, role } = request.user;
    response.status(200).json(
        {
            isAuthenticated: true,
            user: { username, role }
        }
    );
});

module.exports = userRouter;