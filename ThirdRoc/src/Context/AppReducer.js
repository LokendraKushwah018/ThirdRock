const Reducer = (state, action) => {
    switch (action.type) {

        case "TOGGLE_HEADER": return {
            ...state,
            header: !state.header
        }


        default: return state
    }
}

export default Reducer;