export function incomingsReducer(incomings = [], action) {
    if (action.type == "incomings/receivedIncomings") {
        incomings = action.payload.incomings;
    } else if (action.type == "incoming/addIncoming") {
        // let newIncomings = {
        //     ...incomings,
        //     incoming: action.payload.incoming,
        // };
        // console.log("newincomings: ", newIncomings);
        // return newIncomings;
    }
    return incomings;
}

// ********************* ACTIONS ***********************

export function incomingsReceived(incomings) {
    return {
        type: "incomings/receivedIncomings",
        payload: { incomings },
    };
}

export function addincoming(incoming) {
    return {
        type: "incoming/addIncoming",
        payload: { incoming },
    };
}
