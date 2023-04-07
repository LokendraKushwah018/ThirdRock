import Reducer from "./AppReducer";
const { useContext, useReducer } = require("react");
const { createContext } = require("react");


const AppContext = createContext();

const initialValue = {
    header: false,
}
const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(Reducer, initialValue);

    const ToggleHeader = () => {
        dispatch({ type: "TOGGLE_HEADER" })
    }
    return <AppContext.Provider value={{ ...state, ToggleHeader }}>{children}</AppContext.Provider>
}

const UseAppContext = () => {
    return useContext(AppContext);
}

export { AppProvider, UseAppContext };