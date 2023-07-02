import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Flex, Heading, VStack, SimpleGrid, HStack, Button } from "@chakra-ui/react";
import Head  from 'next/head';
import Link from "next/link";
import { useRouter } from 'next/router'


import { Header, Input, Sidebar, Textarea } from "../../components";

type RegisterBookFormData = {
  title: string;
  author: string;
  synopsis: string;
  pagesNumber: number;
  relatedTags: string;
  yearOfPublication: number,
  isbn: number;
  copyright: string;
}

const registerBookFormSchema = yup.object().shape({
  title: yup.string().required('Título obrigatório'),
  author: yup.string().required('Autor obrigatório'),
  synopsis: yup.string().required('Sinopse obrigatória'),
  pagesNumber: yup.number().required('Número de páginas obrigatória'),
})

export default function CreateBook() {
  const router = useRouter()

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(registerBookFormSchema)
  })

  const { errors } = formState

  const handleRegisterBook: SubmitHandler<RegisterBookFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    //chamar o toast de sucesso aqui

    router.push('/books')
  }

  return (
    <Box>
      <Head>
        <title>LibManager | Adicionar livro</title>
      </Head>
      <Header />

      <Flex
        width="100%"
        maxWidth={1480}
        marginY="6"
        marginX="auto"
      >
        <Sidebar />
        
        <Box 
          flex="1" 
        >
        <Flex justifyContent="space-between" paddingBottom="15">        
        <Heading size="lg" fontWeight="normal">Cadastro de livros</Heading>
        </Flex>

        <Box 
          as="form" 
          flex="1" 
          borderRadius={8} 
          onSubmit={handleSubmit(handleRegisterBook)}
        >
          <VStack flexDirection="row">
            <Box  spacing={["6", "8"]} w="100%" flexDirection="row" paddingRight="6">
              <Input 
                name="title" 
                label="Título"
                placeholder="Digite o título do livro"
                error={errors.title}   
                {...register('title')}
              />
              <Input 
                name="author" 
                label="Autor" 
                placeholder="Ex: Andressa Gaspar"
                error={errors.author} 
                {...register('author')} 
              />
                <Textarea 
                name="synopsis" 
                label="Sinopse" 
                placeholder="Sinopse do livro"
                height={149}
                error={errors.synopsis} 
                {...register('synopsis')} 
              />
            </Box>

            <Box  spacing={["6", "8"]} w="100%" flexDirection="row">
              <Input 
                name="pagesNumber" 
                type="number" 
                placeholder="Ex: 208"
                label="Número de páginas" 
                error={errors.pagesNumber} 
                {...register('pagesNumber')}
              />
                 <Input 
                name="relatedTags" 
                label="Tags relacionadas"
                error={errors.relatedTags}   
                {...register('relatedTags')}
              />
                <Input 
                name="yearOfPublication" 
                type="date" 
                placeholder="Ex: 02/04/2021"
                paddingY="7"
                label="Ano de publicação" 
                error={errors.yearOfPublication} 
                {...register('yearOfPublication')}
              />
                <Input 
                name="isbn" 
                type="number" 
                placeholder="ISBN 932-6-2315-12-614"
                label="ISBN" 
                error={errors.isbn} 
                {...register('isbn')}
              />
            </Box>
          </VStack>

            <SimpleGrid  spacing={["6", "8"]} w="100%">
            <Textarea 
                name="copyright" 
                label="Direitos autorais" 
                placeholder="Informe aqui todos os detalhes referentes aos direitos autorais"
                error={errors.copyright} 
                {...register('copyright')} 
              />
            </SimpleGrid>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/books" passHref>
                <Button 
                  as="a" 
                  colorScheme="whiteAlpha"  
                  size="md" 
                  fontSize="small"
                >
                  CANCELAR
                </Button>
              </Link>
              <Button 
                type="submit" 
                colorScheme="red"   
                size="md" 
                fontSize="small"  
                isLoading={formState.isSubmitting}
              >
                CADASTRAR
              </Button>
            </HStack>
          </Flex>

          </Box> 
        </Box> 
      </Flex>
    </Box>
  )
}
