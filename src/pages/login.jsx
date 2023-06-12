import { Flex, Text,Button,FormControl, FormLabel, FormErrorMessage, Input, Heading } from "@chakra-ui/react";
import { Field, Form, Formik } from 'formik';

import {supabase} from '../utils/supabase'


export default function Login(){

    async function signInWithEmail(values,actions) {
        console.log(values)
        const { data, error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        })
        console.log('res',data)
        console.log('res',error)
        actions.setSubmitting(false)
      }

    return(
        <Flex height={'100vh'} width={'500px'}  direction='column'  justifyContent={'center'} alignItems={'flex-start'}> 
                <Heading mb='9'>Sign Up</Heading>
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
                            Sign Up
                        </Button>
                        </Form>
                    )}
                    </Formik>
        </Flex>
    )
}