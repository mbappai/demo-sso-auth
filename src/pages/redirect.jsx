import {useEffect} from 'react'
import { Flex, Text, Heading, useToast } from "@chakra-ui/react";

export default function Redirect(){

    const toast = useToast() 

    useEffect(()=>{

        // Grab paseto from local storage
        const pasetoFromStorage = localStorage.getItem('PLATFORM_PASETO')

        // Confirm that paseto value is not "null" ( as that is the return value
        // of items that do not exist in local storage )

        // If paseto doesn't exist, you could do 2 of the following
        //
        // 1. Either you instruct the user re-login in order to get accessToken 
        //    from which it will be used to get the paseto
        //
        //    OR
        //
        // 2. Once you confirm that pasto doesn't exist, you can check if user session exists in local storage,
        //    if it does, then you can just take the accessToken from there and call the paseto API to get paseto
        //    right here on the redirect page
        // 
        // NOTE: At a later point in time, you have to also consider decoding the paseto token to check
        //        if it's expired or not before you proceed

        if(pasetoFromStorage === null){

            // For this simple demo, I will be doing neither and instead just show
            // user an error message.

            toast({
                title: 'Paseto deesnt exist in storage',
                description: "It seems like user paseto doesnt exist ",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })

        } else{

            // TIP: Second option can be implemented here by checking if paseto has expired or not.
            //      If its expired then handle that use case

            // Redirect user to where they came from ( for now it's myriad flow marketplace )
            location.href = `http://localhost:5174?paseto=${pasetoFromStorage}` // 'http://localhost:5174' is where marketplace runs locally ( replace as needed )
            // ADDITIONAL NOTES: "paseto" query param above is how you pass the paseto back to the marketplace
            
        }
    })



    return(
        <Flex direction={'column'}  height={'100vh'} width={'100%'} justifyContent={'center'} alignItems={'center'}>
            <Heading>Redirecting...</Heading>
            <Text>You are being redirected back to marketplace please hold on.</Text>
        </Flex>
    )
}
