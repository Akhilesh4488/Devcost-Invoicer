import { createContext,useEffect,useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import {db} from "../firebase"
import {doc,getDoc, onSnapshot,} from "firebase/firestore"

export const UserContext = createContext()

export const UserContextProvider = ({children})=>{

    const {CurrentUser} = useContext(AuthContext)
    const [UserData,setUserData] = useState({})
    const [productsList, setProducts] = useState([])
    const currency = {
      symbol:"₹",
      name:"INR"
    }

    useEffect(() => {
        const getUser = async()=>{
          const docSnap = await getDoc(doc(db,"users",CurrentUser.uid))
          if (docSnap.exists()){
            setUserData(docSnap.data())
          }
          else {
            console.log("No User Found")
          }
    
          return docSnap
        }
        CurrentUser && getUser()
    }, [CurrentUser?.uid])


    useEffect(()=>{
      const getPro = ()=>{ 
        onSnapshot(doc(db,"UserProducts",CurrentUser.uid),(doc)=>{
        doc.exists() && setProducts(doc.data().products)
      })}
      return CurrentUser.uid && getPro()
    },[CurrentUser?.uid])

    return(
        <UserContext.Provider value={{UserData,productsList,currency}}>
            {children}
        </UserContext.Provider>
    )

}