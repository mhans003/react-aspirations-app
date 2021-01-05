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
    }
}