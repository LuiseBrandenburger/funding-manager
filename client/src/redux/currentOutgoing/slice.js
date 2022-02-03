export function currentOutgoingReducer(currentOutgoing = null, action) {
    if (action.type == "project/receivedCurrentOutgoing") {
        currentOutgoing = action.payload.project;
    } 
    return currentOutgoing;
}

// ********************* ACTIONS ***********************

export function currentOutgoingReceived(outgoing) {
    return {
        type: "project/receivedCurrentOutgoing",
        payload: { outgoing },
    };
}