import { onAuthStateChanged } from "firebase/auth";
import { createContext,useState,useEffect } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext()

export const AuthContextProvider = ({children})=>{
    const [CurrentUser,setCurrentUser] = useState({})

    useEffect(()=>{
        const AuthState = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user)
        })

        return()=>{
            AuthState()
        }
    },[])

return(
    <AuthContext.Provider value={{CurrentUser}}>
        {children}
    </AuthContext.Provider>
)
}