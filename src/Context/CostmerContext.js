import { createContext, useReducer } from "react";

export const CostmerContext = createContext()

export const CostmerContextProvider = ({children})=>{
    const INITIAL_STATE = {
        Data:null,
        billno:null,
        date :null,
        invoicetable:null,
        invoiceother:null
    }

    const CostmerReducer = (state,action)=>{
        switch(action.type){
            case "Edit_costmer":
                return {Data:action.payload , billno:action.billno,date:action.date,invoicetable:state.invoicetable,invoiceother:state.invoiceother}
            case "Edit_invoice":
                return {Data:state.Data,billno:state.billno,date:state.date,invoicetable:action.invoicetable,invoiceother:action.invoiceother}
            default :
                return state
        }
        
    }

    const [state,dispatch] = useReducer(CostmerReducer,INITIAL_STATE)

    return(
        <CostmerContext.Provider value={{state,dispatch}}>
            {children}
        </CostmerContext.Provider>
    )

}