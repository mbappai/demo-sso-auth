

import React, {
  useState,
  useContext,
  createContext,
  useEffect,
} from "react";



import {supabase} from '../utils/supabase'





const AuthContext = createContext(undefined);
                                                                                                                     
const AuthContextProvider = ({ children }) => {
  
    
    const [session, setSession] = useState(null)

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        const accessToken = session['access_token']

        // call backend API to give you paseto
        setSession(session)
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })

      return () => subscription.unsubscribe()    }, [])
 
  


  const values = {
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>

}



const useAuthContext = () => {  
  const context = useContext(AuthContext);

  if (context === undefined) {
    console.log('Context not used under its provider')
    throw new Error("Context is not being used under its provider");
  }

  return context;
};

export { useAuthContext, AuthContext, AuthContextProvider };
