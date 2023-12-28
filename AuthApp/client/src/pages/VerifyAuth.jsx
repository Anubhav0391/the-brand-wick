import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

const VerifyAuth = () => {
  const {token, user}=useSelector(state=>state)
  console.log(token,user)

  return (
    <Box>
        <Text textAlign={'center'} fontSize={20} fontWeight={800} mx={10}>Token :</Text>
        <Text textAlign={'center'} fontSize={20} fontWeight={500} mx={10}>{token}</Text>
        <Text textAlign={'center'} fontSize={20} fontWeight={800} mx={10}>User :</Text>
        <Text textAlign={'center'} fontSize={20} fontWeight={500} mx={10}><code>{JSON.stringify(user)}</code></Text>
    </Box>
  )
}

export default VerifyAuth