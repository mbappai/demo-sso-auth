

import React, {
  useState,
  useContext,
  createContext,
  useEffect,
} from "react";

import {useNavigate} from 'react-router-dom'
import {supabase} from '../utils/supabase'
import getPaseto from "../utils/paseto";





const AuthContext = createContext(undefined);
                                                                                                                     
const AuthContextProvider = ({ children }) => {
  
    
    // const [session, setSession] = useState(()=>{
    //   // const pasetoFromStorage = localStorage.getItem("PLATFORM_PASETO")
    //   // return pasetoFromStorage
    // })
    const navigate = useNavigate()
    const [session, setSession] = useState()
    const [isAuthenticated, setIsAuthenticated] = useState(true)



    useEffect(()=>{

      if(!isAuthenticated){

        console.log('called here')

        supabase.auth.getSession().then(({ data: { session } }) => {
          const accessToken = session['access_token']
          getPaseto(accessToken).then(res=>{
            console.log('coming from inside',res)
            // setPaseto hear
          })
          // call backend API to give you paseto
          // console.log(session)
        })
      }

    },[isAuthenticated])

    // Event listener provided by supabase which checks the session of a user whenever the app is loaded
    // 
    useEffect(() => {

     

      const { data: { subscription },} = supabase.auth.onAuthStateChange((_event, session) => {
        // only set the paseto in storage when the user signs in
        if(_event === 'SIGNED_IN'){

          console.log('user just signed in')

          
          supabase.auth.getSession().then(({ data: { session } }) => {
            const accessToken = session['access_token']
            getPaseto(accessToken).then(res=>{
              // check if status is 200 and confirm data object is not empty
              if(res.statusCode > 200 && res.data !== ''){
                console.log('error while fetching your paseto token')
                console.log('You might want to show a toast here explaining error')
              }else{
                const paseto = res.payload.token
                // set paseto to local storage
                localStorage.setItem('PLATFORM_PASETO',paseto)
                setIsAuthenticated(true) 

                // redirect user to redirect page
                navigate('/redirect')
              }
              
              // set authenticated state only after we get the paseto
            })
            // call backend API to give you paseto
            // console.log(session)
          })
          // if(!isAuthenticated){
          //   // check if paseto exist in local storage
          //   const pasetoFromStorage = localStorage.getItem('PLATFORM_PASETO')
          //   if(pasetoFromStorage){
          //     setIsAuthenticated(true)
          //   }
          // }
          // setSession(session)
      }
        if(_event === 'SIGNED_OUT'){
          console.log('clear platform paseto here')
        } 
      })

      return () => subscription.unsubscribe()    }, [])
 
  
      function signOut(){
        supabase.auth.signOut() 
      }


  const values = {
    isAuthenticated,
    signOut
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
