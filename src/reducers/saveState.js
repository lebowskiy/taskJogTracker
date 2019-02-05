const initialState = {};

export default (state = initialState, action) => {
    const {payload, type} = action;
    switch(type) {
        case 'SAVE_VALUE_STATE':
            return {...state, [payload.componentKey]: payload.value};
        default:
            return state
    }
}