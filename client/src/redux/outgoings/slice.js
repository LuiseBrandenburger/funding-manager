export function outgoingsReducer(outgoings = [], action) {
    if (action.type == "outgoings/receivedOutgoings") {
        outgoings = action.payload.outgoings;
    } else if (action.type == "outgoing/addOutgoing") {
        const newOutgoings = [
            action.payload.outgoing,
            ...outgoings
        ];
        console.log("newOutgoings: ", newOutgoings);
        return newOutgoings;
    } else if (action.type == "outgoing/deleteOutgoing") {
        outgoings = outgoings.filter((outgoing) => {
            return outgoing.id !== action.payload.id;
        });
    } else if (action.type == "outgoing/updateOutgoing") {

        outgoings = outgoings.filter((outgoing) => {
            return outgoing.id !== action.payload.id;
        });
        const newOutgoings  = [
            action.payload.outgoing,
            ...outgoings
        ];
        return newOutgoings;
    }
    return outgoings;
}

// ********************* ACTIONS ***********************

export function outgoingsReceived(outgoings) {
    return {
        type: "outgoings/receivedOutgoings",
        payload: { outgoings },
    };
}

export function addOutgoing(outgoing) {
    return {
        type: "outgoing/addOutgoing",
        payload: { outgoing },
    };
}


export function deleteOutgoing(id) {
    return {
        type: "outgoing/deleteOutgoing",
        payload: { id },
    };
}

export function updateOutgoing(outgoing, id) {
    console.log("in reducer 2: ", outgoing, id);
    return {
        type: "outgoing/updateOutgoing",
        payload: { outgoing, id },
    };
}