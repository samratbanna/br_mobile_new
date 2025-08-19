import React, { useContext } from "react";

export const SessionContext = React.createContext<any>({})

export const useSessionContext = () => {
    return useContext(SessionContext)
}