import {useState} from 'react'
import { Flex, Text,Button,FormControl, useToast, FormLabel, HStack, FormErrorMessage, Input, Heading } from "@chakra-ui/react";
import { Field, Form, Formik } from 'formik';
import {useNavigate}  from 'react-router-dom'

import {supabase} from '../utils/supabase'


export default function SignUp(){


    const toast  = useToast()

    const navigate = useNavigate()

    const [hasSentConfirmEmail, setHasSentConfirmEmail] = useState(false)

    async function signUpWithEmail(values,actions) {
        try{
            const { data, error } = await supabase.auth.signUp({
                email: values.email,
                password: values.password,
              })
              
              console.log(data, error)

              toast({
                  title: 'Account created.',
                  description: "We've created your account for you.",
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                })
                setHasSentConfirmEmail(true)
                actions.setSubmitting(false)

        }catch(err){
            
            console.log('error signing Up user with email', err)
        
              toast({
                  title: 'Problem creating your account.',
                  description: "Theres been a problem whitle trying to create your account",
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                })

                actions.setSubmitting(false)

        }
       

        console.log('res',data)
        console.log('res',error)

       
      }

      function gotoLogin(){
        navigate('/')  // which is same as login page
      }

      const display = hasSentConfirmEmail
      ?<Flex width={'500px'} height='400px' border='1px solid #333333' justifyContent={'center'} alignItems={'center'}>
            <Heading>
                Check your email
            </Heading>
            <Text>A confirmation email has been sent to your inbox to proceed</Text>
      </Flex>
      :(
        <>
        <Formik 
     initialValues={{ email: '', password: '' }}
     onSubmit={(values, actions) => {
        signUpWithEmail(values, actions)
     }}
     >
         {(props) => (
             <Form  style={{ display:'flex', flexDirection:'column', justifyContent:'center', width:'100%'}}> 
             <Field style={{marginBottom:'1rem'}} name='email'> 
                 {({ field, form }) => (
                 <FormControl isInvalid={form.errors.name && form.touched.name}>
                     <FormLabel ml={4}>Email</FormLabel>
                     <Input {...field} placeholder='johnDoe@yahoo.com' />
                     <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                 </FormControl>
                 )}
             </Field>
             <Field name='password' >
                 {({ field, form }) => (
                 <FormControl mb={7} isInvalid={form.errors.password && form.touched.password}>
                     <FormLabel mt={6} ml={4}>Password</FormLabel>
                     <Input {...field} placeholder='*******' />
                     <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                 </FormControl>
                 )}
             </Field>
             <Button
                 mt={4}
                 colorScheme='teal'
                 isLoading={props.isSubmitting}
                 type='submit'
             >
                 Sign Up
             </Button>
             </Form>
         )}
         </Formik>
         <HStack w="100%" mt={3} spacing={2}>
             <Text>Already have an account?</Text>
             <Button onClick={gotoLogin} variant="link">Login</Button>
         </HStack>
      </>
      )

    return(
        <Flex height={'100vh'} w='500px'  direction='column'  justifyContent={'center'} alignItems={'flex-start'}> 
                <Heading mb='9'>Sign Up</Heading>
                {display}
        </Flex>
    )
}