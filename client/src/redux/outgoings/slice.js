export function outgoingsReducer(outgoings = [], action) {
    if (action.type == "outgoings/receivedOutgoings") {
        outgoings = action.payload.outgoings;
    } else if (action.type == "outgoing/addOutgoing") {
        const newOutgoings = [
            ...outgoings,
            action.payload.outgoing
        ];
        console.log("newOutgoings: ", newOutgoings);
        return newOutgoings;
    } else if (action.type == "outgoing/deleteOutgoing") {
        outgoings = outgoings.filter((outgoing) => {
            // console.log("outgoing.id", outgoing.id)
            // console.log("action.payload.id",action.payload.id)
            return outgoing.id !== action.payload.id
        
        });

    }
    // console.log("outgoings in Reducer 3: ", outgoings);
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
    console.log("id from delte Action:", id)
    return {
        type: "outgoing/deleteOutgoing",
        payload: { id },
    };
}