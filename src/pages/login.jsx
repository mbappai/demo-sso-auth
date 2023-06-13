import { Flex, Text,Button,FormControl, HStack, useToast, FormLabel, FormErrorMessage, Input, Heading } from "@chakra-ui/react";
import { Field, Form, Formik } from 'formik';
import {useNavigate} from "react-router-dom"
import {supabase} from '../utils/supabase'
import { useAuthContext } from "../context/authContext";
 

export default function Login(){

    const navigate = useNavigate()

    const toast  = useToast()

    const {signOut} = useAuthContext()

    async function signInWithEmail(values,actions) {
        console.log(values)
        try{
            const { data, error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password,
              })
      
              toast({
                  title: 'Login successfully',
                  description: "You have successfully logged into account.",
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                })
                
                actions.setSubmitting(false)

                console.log(data,error)

        }catch(err){

            console.log('error signing In with email',err)
      
              toast({
                  title: 'Problem loggin into your account.',
                  description: "err.message",
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                })
                actions.setSubmitting(false)
        }
       

        actions.setSubmitting(false)
      }


      function gotoSignUp(){
        navigate('/signUp')
      }


      
      

    return(
        <Flex height={'100vh'}  maxWidth={'500px'} w='500px' direction='column'  justifyContent={'center'} alignItems={'flex-start'}> 
            <Flex as={'header'}>
                <Button variant={'solid'} onClick={signOut}>Logout</Button>
            </Flex>
                <Heading mb='9'>Login</Heading>
                <Formik 
                initialValues={{ email: '', password: '' }}
                onSubmit={(values, actions) => {
                   signInWithEmail(values, actions)
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
                            Login
                        </Button>
                        </Form>
                    )}
                    </Formik>
                    <HStack w="100%" mt={3} spacing={2}>
                        <Text>Don't have an account?</Text>
                        <Button onClick={gotoSignUp} variant="link">Sign Up</Button>
                    </HStack>
                    
        </Flex>
    )
}