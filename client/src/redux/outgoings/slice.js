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
        // FIXME: 
        // const newOutgoings = [
        //     action.payload.outgoing,
        //     ...outgoings
        // ];
        // console.log("newOutgoings: ", newOutgoings);
        // return newOutgoings;
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

export function updateOutgoing(outgoing) {
    return {
        type: "outgoing/updateOutgoing",
        payload: { outgoing },
    };
}

export function deleteOutgoing(id) {
    return {
        type: "outgoing/deleteOutgoing",
        payload: { id },
    };
}