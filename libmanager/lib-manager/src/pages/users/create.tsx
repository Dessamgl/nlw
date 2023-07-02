import { Box, Flex, Heading, } from "@chakra-ui/react";

import Link from "next/link";
import Head  from 'next/head';
import { Header, Sidebar } from "../../components";
import { GetStaticProps } from "next";
import { api } from "../../services/api";

interface UserProps {
  name: string;
}

export default function UsersCreate({ name }: UserProps) {

  return (
    <Box>
      <Head>
        <title>LibManager | Criar usuário</title>
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
        <Heading size="lg" fontWeight="normal">Teste {name}</Heading>
        
        </Flex>
        
        </Box>
      </Flex>
    </Box>
  )
}

export const getStaticProps: GetStaticProps<UserProps> = async () => {

  const response = await api.get('/howdy')

  return {
    props: {
      name: response.data.message,
    },
  };
}