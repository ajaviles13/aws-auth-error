import { createContext, useContext, useState, useEffect } from "react";
import { aws_getCurrentUser } from "../lib/amplify";
import { Auth, API, Storage, Amplify } from 'aws-amplify';
import config from '../src/aws-exports'; // Ensure this path points to your aws-exports.js file
Amplify.configure(config); // Correctly configure Amplify with the config file

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [globalEmail, setGlobalEmail] = useState(null);

    useEffect(() => {
        aws_getCurrentUser().then((response) => {
            if(response) {
                setIsLoggedIn(true);
                setUser(response);
            }else{
                setIsLoggedIn(false);   
                setUser(null);
            }

        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading,
                setIsLoading,
                globalEmail,
                setGlobalEmail
            }}
        >
        {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;