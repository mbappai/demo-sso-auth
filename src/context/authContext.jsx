

import React, {
  useState,
  useContext,
  createContext,
  useEffect,
} from "react";

import {useNavigate} from 'react-router-dom'
import {supabase} from '../utils/supabase'
import getPaseto from "../utils/paseto";

import {useToast} from '@chakra-ui/react'




const AuthContext = createContext(undefined);
                                                                                                                     
const AuthContextProvider = ({ children }) => {
  
    
    // const [session, setSession] = useState(()=>{
    //   // const pasetoFromStorage = localStorage.getItem("PLATFORM_PASETO")
    //   // return pasetoFromStorage
    // })
    const toast  = useToast()
    const navigate = useNavigate()
    const [session, setSession] = useState()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoggingIn, setIsLoggingIn] = useState(false)



    useEffect(()=>{

      if(!isAuthenticated){

        console.log('called here')

        supabase.auth.getSession().then(({ data: { session } }) => {
          const accessToken = session['access_token']
          getPaseto(accessToken).then(res=>{
            console.log('coming from inside',res)
            // setPaseto hear
          })

        })
      }

    },[isAuthenticated])

    // Event listener provided by supabase which checks the session of a user whenever the app is loaded
    // 
    useEffect(() => {

      const { data: { subscription },} = supabase.auth.onAuthStateChange((_event, session) => {
        // only set the paseto in storage when the user signs in
        if(_event === 'SIGNED_IN'){
 
          supabase.auth.getSession().then(({ data: { session } }) => {
            const accessToken = session['access_token']
            getPaseto(accessToken).then(res=>{

              // check if status is 200 and confirm data object is not empty
              if(res.statusCode > 200 && res.data !== ''){

                toast({
                  title: 'Error fetching user paseto token',
                  description: "Read console for more information",
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                })
                
                setIsLoggingIn(false)

              }else{

                setIsLoggingIn(false)

                toast({
                  title: 'Login successfully',
                  description: "You have successfully logged into account.",
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                })

                // Extract paseto from response
                const paseto = res.payload.token

                // Set paseto to local storage
                localStorage.setItem('PLATFORM_PASETO',paseto)

                setIsAuthenticated(true) 

                // Redirect user to redirect page
                navigate('/redirect')
              }
              
            })

          })
         
      }
        if(_event === 'SIGNED_OUT'){
          localStorage.removeItem('PLATFORM_PASETO')
          setIsAuthenticated(false)
        } 
      })

      return () => subscription.unsubscribe()    }, [])
 
  
      async function signInWithPassword(email, password){

        // This state is consumed by Login page in order to track the state of the login
        // process that is happening here in the auth context
          setIsLoggingIn(true)

          const { data, error } = await supabase.auth.signInWithPassword({
              email: email,
              password: password,
            })

            // Error will not be empty if user encounters any issues while trying to log in using supabase
            if(error){
              toast({
                title: 'Error login in with supabase',
                description: "There is an error while trying to log in with supabase",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
            }
     
      }

      function signOut(){
        supabase.auth.signOut() 
      }


  const values = {
    isAuthenticated,
    isLoggingIn, 
    signInWithPassword,
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
