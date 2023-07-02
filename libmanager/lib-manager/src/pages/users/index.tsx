import { Box, Button, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, useBreakpointValue, Badge } from "@chakra-ui/react";

import Link from "next/link";
import Head  from 'next/head';
import { Header, Sidebar } from "../../components";

export default function UsersList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Box>
      <Head>
        <title>LibManager | Usuários</title>
      </Head>
      <Header />

      <Flex 
        w="100%" 
        my="6" 
        maxW={1480} 
        mx="auto"
      >
        <Sidebar />
        <Box flex="1">
        <Flex justifyContent="space-between">        
        <Heading size="lg" fontWeight="normal">Usuários</Heading>
        
        </Flex>
        
        </Box>
      </Flex>
    </Box>
  )
}