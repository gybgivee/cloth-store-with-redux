import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener,createUserDocumentFromAuth} from "../utilities/firebase/firebase.utils";
export const UserDataContext = createContext(
    {
        currentUser: null,
        setCurrentUser: () => null,
    }
)

//component
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };
    //didMounted
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            //login
            if (user) {
                 createUserDocumentFromAuth(user);
            }
            //if logout there will be no value in user => user=null
            setCurrentUser(user);
            console.log('UserDataContext:', user);
        });
        //return it to remove event listeners when it done
        return unsubscribe;
    }, []);
    //unMounted
    return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>
}