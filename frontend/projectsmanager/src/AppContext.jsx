import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [token, setToken] = useState('');
    const [user_id, setUser_id] = useState('');
    const [email, setEmail] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    const [workTime, setWorkTime] = useState(30*60);
    const [restTime, setRestTime] = useState(5*60);
    const [currentTime, setCurrentTime] = useState(workTime);
    const [isWork, setIsWork] = useState(true);
    const [projectSelected, setProjectSelected] = useState(null);
    const [timeCounter, setTimeCounter] = useState(0);
    const [edited, setEdited] = useState(false);
    const [cycles, setCycles] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);

    return <AppContext.Provider value={{ token, setToken, user_id, setUser_id, isLogged, setIsLogged, 
                                        workTime, setWorkTime, restTime, setRestTime, currentTime, setCurrentTime, isWork, setIsWork, projectSelected, setProjectSelected, timeCounter, setTimeCounter,
                                        edited, setEdited, cycles, setCycles, isAdmin, setIsAdmin, email, setEmail }}>
        {children}
    </AppContext.Provider>
}