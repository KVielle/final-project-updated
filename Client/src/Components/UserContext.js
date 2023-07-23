import { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [name, setName] = useState(() => {
    const userName = window.localStorage.getItem("name");
    if (userName) {
        return JSON.parse(userName);
    }
    return null;
    });
    const [currentUser, setCurrentUser] = useState(() => {
    const user = window.localStorage.getItem("user");
    if (user && user !== "undefined") {  // Add check for "undefined"
        return JSON.parse(user);
    }
    return null;
    });
    return (
    <UserContext.Provider
        value={{ name, setName, currentUser, setCurrentUser }}
    >
        {children}
    </UserContext.Provider>
    );
};