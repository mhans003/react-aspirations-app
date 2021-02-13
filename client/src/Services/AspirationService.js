export default {
    //Get all aspirations.
    getAspirations: () => {
        return fetch("/user/aspirations")
            .then(response => {
                if(response.status !== 401) {
                    return response.json().then(data => data);
                } else {
                    return {
                        message: {
                            msgBody: "Unauthorized",
                            msgError: true
                        }
                    };
                }
            });
    },
    //Save one aspiration.
    postAspiration: (aspiration) => {
        return fetch("/user/aspiration", {
            method: "post",
            body: JSON.stringify(aspiration),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if(response.status !== 401) {
                return response.json().then(data => data);
            } else {
                return {
                    message: {
                        msgBody: "Unauthorized",
                        msgError: true
                    }
                };
            }
        });
    },
    //Post a milestone
    postMilestone: (aspirationId, milestone) => {
        return fetch(`/user/aspiration/${aspirationId}`, {
            method: "put",
            body: JSON.stringify(milestone),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if(response.status !== 401) {
                return response.json().then(data => data);
            } else {
                return {
                    message: {
                        msgBody: "You are not authorized.",
                        msgError: true
                    }
                };
            }
        }).catch(() => {
            return {
                message: {
                    msgBody: "There was an error posting this milestone.",
                    msgError: true
                }
            };
        })
    },
    //Delete a milestone from an aspiration
    deleteMilestone: (aspirationId, milestoneId) => {
        return fetch(`/user/aspiration/${aspirationId}`, {
            method: "delete",
            body: JSON.stringify(milestoneId),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if(response.status !== 401) {
                return response.json().then(data => data);
            } else {
                return {
                    message: {
                        msgBody: "Unauthorized",
                        msgError: true
                    }
                };
            }
        });
    },
    //Edit an aspiration
    editAspiration: (aspirationId, newAspiration) => {
        return fetch(`/user/edit/aspiration/${aspirationId}`, {
            method: "put",
            body: JSON.stringify(newAspiration),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if(response.status !== 401) {
                return response.json().then(data => data);
            } else {
                return {
                    message: {
                        msgBody: "Unauthorized",
                        msgError: true
                    }
                };
            }
        });
    },
    //Edit a milestone in an existing aspiration.
    editMilestone: (milestoneId, editedMilestone, aspirationId) => {
        return fetch(`/user/aspiration/${aspirationId}/${milestoneId}`, {
            method: "put",
            body: JSON.stringify(editedMilestone),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if(response.status !== 401) {
                return response.json().then(data => data);
            } else {
                return {
                    message: {
                        msgBody: "Unauthorized",
                        msgError: true
                    }
                };
            }
        });
    },
    //Delete an existing aspiration.
    deleteAspiration: (aspirationId) => {
        return fetch(`/user/aspiration/delete/${aspirationId}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if(response.status !== 401) {
                return response.json().then(data => data);
            } else {
                return {
                    message: {
                        msgBody: "Unauthorized",
                        msgError: true
                    }
                };
            }
        });
    },
    //Toggle status as in progress/complete
    toggleComplete: (aspirationId, aspirationStatus) => {
        return fetch(`/user/status/${aspirationId}`, {
            method: "put",
            body: JSON.stringify(aspirationStatus),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if(response.status !== 401) {
                return response.json().then(data => data);
            } else {
                return {
                    message: {
                        msgBody: "Unauthorized",
                        msgError: true
                    }
                };
            }
        });
    }
}