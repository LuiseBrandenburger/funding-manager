export function outgoingsReducer(outgoings = [], action) {
    if (action.type == "outgoings/receivedOutgoings") {
        outgoings = action.payload.outgoings;
    } else if (action.type == "outgoing/addOutgoing") {
        
        // TODO: FIX THIS!
        // const newOutgoings = outgoings.map(p => {...outgoings, newOutgoing: action.payload.outgoing} );
        // let newOutgoings = {
        //     ...outgoings,
        //     outgoing: action.payload.outgoing,
        // };
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
