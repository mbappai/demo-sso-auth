import { Flex, Text, Heading } from "@chakra-ui/react";

export default function Redirect()
{
    return(
        <Flex direction={'column'}  height={'100vh'} width={'100%'} justifyContent={'center'} alignItems={'center'}>
            <Heading>Redirecting...</Heading>
            <Text>You are being redirected back to marketplace please hold on.</Text>
        </Flex>
    )
}
