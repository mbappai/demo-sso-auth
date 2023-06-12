

import React, {
  useState,
  useContext,
  createContext,
  useEffect,
} from "react";



import {supabase} from '../utils/supabase'
import getPaseto from "../utils/paseto";




const AuthContext = createContext(undefined);
                                                                                                                     
const AuthContextProvider = ({ children }) => {
  
    
    // const [session, setSession] = useState(()=>{
    //   // const pasetoFromStorage = localStorage.getItem("PLATFORM_PASETO")
    //   // return pasetoFromStorage
    // })
    const [session, setSession] = useState()
    const [isAuthenticated, setIsAuthenticated] = useState(true)




    // Event listener provided by supabase which checks the session of a user whenever the app is loaded
    // 
    useEffect(() => {

      supabase.auth.getSession().then(({ data: { session } }) => {
        const accessToken = session['access_token']
        getPaseto(accessToken).then(res=>{
          console.log('coming from inside',res)
        })
        // call backend API to give you paseto
        // console.log(session)
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        console.log('eventType',_event)
        // only set the paseto in storage when the user signs in
        if(_event === 'SIGNED_IN'){
          if(!isAuthenticated){
            // check if paseto exist in local storage
            const pasetoFromStorage = localStorage.getItem('PLATFORM_PASETO')
            if(pasetoFromStorage){
              setIsAuthenticated(true)
            }
          }
          setSession(session)
      }
      })

      return () => subscription.unsubscribe()    }, [])
 
  


  const values = {
    isAuthenticated
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
