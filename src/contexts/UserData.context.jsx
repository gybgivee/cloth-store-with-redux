import { createContext, useState, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utilities/firebase/firebase.utils";
import { createAction } from "../utilities/reducer/reducer.utils";
//context same as when using context
export const UserDataContext = createContext(
    {
        currentUser: null,
        setCurrentUser: () => null,
    }
)
const initialState = {
    currentUser: null
}

export const USER_ACTION_TYPE = {
    SET_CURRENT_USER: "SET_CURRENT_USER",
}
const userDataReducer = (state, action) =>{
    const {type,payload} = action;
    switch(type){
        case 'SET_CURRENT_USER': 
        return {
            ...state, 
            currentUser:payload
        }
        default: throw new Error(`Unhandled action ${type} in userDataReducer`);
    }
}
//same UserProvider when using context 
export const UserProvider = ({ children }) => {
    //const [currentUser, setCurrentUser] = useState(null);
    //only change this
    const [state,dispatch] = useReducer(userDataReducer,initialState);
    const {currentUser} = state;
    const setCurrentUser = (user)=>{
        dispatch(createAction(USER_ACTION_TYPE.SET_CURRENT_USER,user))
    }
    const value = { currentUser, setCurrentUser };
    
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
          
            if (user) {
                 createUserDocumentFromAuth(user);
            }
           
            setCurrentUser(user);
            console.log('UserDataContext:', user);
        });
       
        return unsubscribe;
    }, []);
    //unMounted
    return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>
}

/* Traditional context state
//context
export const UserDataContext = createContext(
    {
        currentUser: null,
        setCurrentUser: () => null,
    }
)
const userDataReducer = (state,action)=>{
    const {type,payload} = action;

}
//component using state to store the value
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
*/