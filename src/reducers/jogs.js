const initialState = {
    jogsData: [],
    isLoaded: false,
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'SAVE_JOGS_DATA':
            return {
                ...state,
                jogsData: payload,
                isLoaded: true,
            };
        case 'ADD_NEW_JOG':
            return {
                ...state,
                jogsData: payload,
                isLoaded: true,
            };
        case 'RESET_JOGS_DATA':
            return {
                ...initialState,
                isLoaded: false
            };
        default:
            return state
    }
}