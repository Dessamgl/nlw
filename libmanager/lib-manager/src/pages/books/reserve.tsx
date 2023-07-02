import { Box, Select, Flex, Heading, Button, useToast, HStack, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";

import Link from "next/link";
import Head  from 'next/head';
import { Header, Sidebar } from "../../components";
import { api } from "../../services/api";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { addDays, parseISO } from "date-fns";

interface ReservesRequest {
  users: UserProps[]
  books: BookProps[]
}

interface UserProps {
  id: string;
  name: string;
}

interface BookProps {
  id: string;
  title: string;
  author: string;
  isbn: string;
}

export default function ReservesCreate({ users, books }: ReservesRequest) {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [days, setDays] = useState(0)

  const toast = useToast()

  async function reserveBook() {
    try {
      const response = await api.post('reserves/create', {
        userId: selectedUser,
        bookId: selectedBook,
        reserveDays: addDays((Date.now()), days)
      });

      console.log(response.data)
      toast({
        description: "Livro reservado com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      }) 
  
    } catch (error) {
      toast({
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      })  
    }
  }
  

  return (
    <Box>
      <Head>
        <title>LibManager | Reservar</title>
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
          <Heading size="lg" fontWeight="normal">Reservar livros </Heading>
        </Flex>

        <Box mt="16" d="flex" >

          <HStack spacing="8" w="100%">
          <Select 
            borderColor="gray.800"
            bg="gray.800"
            color="white"
            fontWeight="bold" 
            placeholder="Selecione um usuário"
            colorScheme="green"
            variant="filled"
            h="12"
            onChange={(e) => {setSelectedUser(e.target.value)}}
            value={selectedUser}
          >
            {users.map(user => (
              <option 
                key={user.id} 
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </Select>

          <Select 
            borderColor="gray.800"
            bg="gray.800"
            color="white"
            fontWeight="bold" 
            placeholder="Selecione um livro"
            colorScheme="green"
            variant="filled"
            h="12"
            onChange={(e) => {setSelectedBook(e.target.value)}}
            value={selectedBook}
          >
            {books.map(book => (
              <option 
                key={book.id} 
                value={book.id}
              >
                {book.title}
              </option>
            ))}
          </Select>
        </HStack>

            
      </Box>
        <Text mt="16" fontSize="18">Você deseja fazer a reserva para quantos dias?</Text>
        <Text mt="2" fontSize="12">Lembrando que após essa data, você precisará reservar novamente. Ou tentar a retirada presencialmente.</Text>

        <RadioGroup mt="4" onChange={setDays} value={days}>
        <Stack direction="column">
          <Radio value="1">1 dia</Radio>
          <Radio value="2">2 dias</Radio>
          <Radio value="3">3 dias</Radio>
        </Stack>
      </RadioGroup>
      {/* <Link href="/books/reserve" passHref> */}
        <Button 
          as="a" 
          size="md" 
          fontSize="small" 
          colorScheme="red" 
          mt="16"
          onClick={reserveBook}
          disabled={selectedBook && selectedUser && days > 0 ? false : true}
        >
          RESERVAR
        </Button>
      {/* </Link> */}
        
      </Box>
    </Flex>
  </Box>
  )
}

export const getStaticProps: GetStaticProps<ReservesRequest> = async () => {

  const usersResponse = await api.get('/users')
  const booksResponse = await api.get('/books')

  return {
    props: {
      users: usersResponse.data,
      books: booksResponse.data
    },
  };
}