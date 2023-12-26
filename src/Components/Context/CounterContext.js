import { createContext, useState } from "react";

export let CounterContext = createContext();

export default function CounterContextProvider(props) {

    console.log(props);

    const [counter, setCounter] = useState(0);
    
    return <CounterContext.Provider value={{ counter }}>
        {props.children}
    </CounterContext.Provider>
}