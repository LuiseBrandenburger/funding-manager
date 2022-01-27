const submitLoginAndRegistrationEndpoint = (data, url) => {
    return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
};

const getUserEndpoint = () => {
    return fetch("/user").then((response) => response.json());
};

const getAllUsersEndpoint = () => {
    return fetch("/get-all-users").then((response) => response.json());
};

const searchUsersEndpoint = (data) => {
    return fetch(`/users/${data}`).then((response) => response.json());
};


const getUserIdEndpoint = () => {
    return fetch("/api/user-id").then((response) => response.json());
};



export {
    getUserEndpoint,
    getAllUsersEndpoint,
    searchUsersEndpoint,
    submitLoginAndRegistrationEndpoint,
    getUserIdEndpoint,
};
