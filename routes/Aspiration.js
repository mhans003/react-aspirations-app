const express = require("express");
const aspirationRouter = express.Router();
const passport = require("passport");
const User = require("../models/User");
const Aspiration = require("../models/Aspiration");

//Get all aspirations for a user.
aspirationRouter.get("/", passport.authenticate("jwt", {session: false}), (request, response) => {
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

//Create a new aspiration for an existing user.
aspirationRouter.post("/", passport.authenticate("jwt", {session: false}), (request, response) => {
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
aspirationRouter.put("/:id", passport.authenticate("jwt", {session: false}), (request, response) => {
    //Create the instance of the new aspiration using the request body.
    console.log("in put route to add new milestone");
    console.log(request.body);
    console.log(request.params.id);
    Aspiration.updateOne(
        {_id: request.params.id},
        {$push: {milestones: request.body}}
    ).then(result => {
        console.log(result);
        //response.json(result);
        response.status(200).json(
            {
                message: {
                    msgBody: "Successfully posted new milestone!",
                    msgError: false
                }
            }
        )
    }).catch(error => {
        response.status(500).json(error);
    });
});

//Delete an aspiration.
aspirationRouter.delete("/delete/:id", passport.authenticate("jwt", {session: false}), (request, response) => {
    console.log("in delete route");
    console.log("id:" + request.params.id);
    Aspiration.remove(
        {_id: request.params.id}
    ).then(result => {
        console.log(result);
        response.json(result);
    }).catch(error => {
        response.json(error);
        console.log(error);
    });
});

//Delete a milestone from an existing aspiration.
aspirationRouter.delete("/:id", passport.authenticate("jwt", {session: false}), (request, response) => {
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
});

//Edit an aspiration.
aspirationRouter.put("/edit/:id", passport.authenticate("jwt", {session: false}), (request, response) => {
    console.log("in edit route");
    console.log(request.params.id);
    console.log(request.body);
    Aspiration.findOneAndUpdate(
        {_id: request.params.id},
        {$set: {title: request.body.title, description: request.body.description}}
    ).then(result => {
        console.log(result);
        response.json(result);
    }).catch(error => {
        response.json(error);
    });
});

//Toggle status of aspiration.
aspirationRouter.put("/status/:id", passport.authenticate("jwt", {session: false}), (request, response) => {
    let newStatus = request.body.status === "In Progress" ? "Achieved" : "In Progress";
    console.log(newStatus);
    Aspiration.findOneAndUpdate(
        {_id: request.params.id},
        {$set: {status: newStatus}}
    ).then(result => {
        console.log(result);
        response.json(result);
    }).catch(error => {
        console.log(error);
        response.json(error);
    });
});

//Edit a milestone in an existing aspiration
aspirationRouter.put("/:aspirationId/:milestoneId", passport.authenticate("jwt", {session: false}), (request, response) => {
    console.log("in route to edit a milestone");
    console.log(request.body.text);
    console.log(request.params.aspirationId);
    console.log(request.params.milestoneId);
    Aspiration.updateOne(
        {_id: request.params.aspirationId, "milestones.id": request.params.milestoneId},
        {$set: {"milestones.$.text": request.body.text}}
    ).then(result => {
        console.log(result);
        response.json(result);
    }).catch(error => {
        response.json(error);
    });
});

module.exports = aspirationRouter;