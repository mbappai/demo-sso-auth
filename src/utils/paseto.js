import axios from 'axios'

export default async function getPaseto(accessToken){
    const res =  await axios.post('https://testnet.gateway.myriadflow.com/api/v1.0/auth/web2',{
        token: accessToken,
        provider:'supabase',
        type: 'web2'
    })

    return res.data

}

