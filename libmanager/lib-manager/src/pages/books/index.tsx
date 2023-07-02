import { Box, Button, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, useBreakpointValue, Badge } from "@chakra-ui/react";

import Link from "next/link";
import Head  from 'next/head';
import { Header, Sidebar } from "../../components";

export default function BooksList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  //TODO: mover para "constants" de "books"
  enum STATUS_BOOK {
    FREE = "livre",
    RESERVED = "reservado",
    BORROWED = "emprestado",
    LATE = "atrasado",
  }

  let colorStatusBook: string;

  //TODO: trocar para a variável com o status da api
  switch(colorStatusBook) {
    case STATUS_BOOK.FREE:
      colorStatusBook = "green";
    break;
    case STATUS_BOOK.RESERVED:
      colorStatusBook = "orange";
    break;
    case STATUS_BOOK.BORROWED:
      colorStatusBook = "gray";
    break;
    case STATUS_BOOK.LATE:
      colorStatusBook = "red";
    break;
    default:
      colorStatusBook = "green";
  }

  return (
    <Box>
      <Head>
        <title>LibManager | Livros</title>
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
        <Heading size="lg" fontWeight="normal">Livros</Heading>
        
        </Flex>
        <Box borderRadius={8} mt="8">

        <Table>
          <Thead>
            <Tr> 
              <Th color="gray.400">Título</Th>
              { isWideVersion && <Th color="gray.400">Autor</Th>}
              <Th color="gray.400">Emprestado</Th>
              <Th color="gray.400">Devolução</Th>
              <Th color="gray.400">Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr bg="gray.800" borderColor="gray.900" borderWidth="medium">
              <Td>
                  Código limpo
              </Td >
              { isWideVersion && <Td color="gray.200">Guilherme Capitão</Td> }
              <Td color="gray.200">
                  22/06//2021
              </Td>
              <Td color="gray.200">
                  24/07/22021
              </Td>
              <Td color="gray.200">
                <Badge variant="solid" colorScheme={colorStatusBook}>
                  Livre
                </Badge>
              </Td>
            </Tr>
            <Tr bg="gray.800" borderColor="gray.900" borderWidth="medium" >
              <Td>
                  Código limpo
              </Td>
              { isWideVersion && <Td color="gray.200">Guilherme Capitão</Td> }
              <Td color="gray.200">
                  22/06//2021
              </Td>
              <Td color="gray.200">
                  24/07/22021
              </Td>
              <Td color="gray.200">
                <Badge variant="solid" colorScheme={colorStatusBook}>
                  Livre
                </Badge>
              </Td>
            </Tr>
            <Tr bg="gray.800" borderColor="gray.900" borderWidth="medium" >
              <Td>
                Código limpo
              </Td>
              { isWideVersion && <Td color="gray.200">Guilherme Capitão</Td> }
              <Td color="gray.200">
                  22/06//2021
              </Td>
              <Td color="gray.200">
                  24/07/22021
              </Td>
              <Td color="gray.200">
                <Badge variant="solid" colorScheme={colorStatusBook}>
                  Livre
                </Badge>
              </Td>
            </Tr>
          </Tbody>
        </Table>

        </Box>
        </Box>
      </Flex>
    </Box>
  )
}