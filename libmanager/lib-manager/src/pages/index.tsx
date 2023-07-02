import * as yup from "yup";
import { Box, Button, Flex, Heading, Text, Stack } from "@chakra-ui/react";
import { Input } from "../components";
import Image from 'next/image';

import LogoImg from '../../public/logo.png';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useRouter } from "next/router";

type LoginFormData = {
  email: string;
  password: string;
}

const LoginFormSchema = yup.object().shape({
  email: yup.string().email().required('E-mail obrigatório'),
  password: yup.string().min(6, "Mínimo de 6 caracteres").required('Senha obrigatória'),
})

export default function Home() {
  const router = useRouter()

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(LoginFormSchema)
  })

  const { errors } = formState

  const handleLoginUser: SubmitHandler<LoginFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    router.push('/books')
  }

  return (
    <>
      <Flex 
        w="100vw"
        h="100vh" 
        maxW={1480} 
        mx="auto"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          mb="6"
        >
          <Image src={LogoImg} alt="logo" width={60} height={60} />
          <Text fontSize={32} fontWeight="bold" ml={6}>LibManager</Text>
        </Flex>
        <Box
          bg="gray.800"
          minW={500}
          p="16"
          borderRadius="8"
          as="form"
          onSubmit={handleSubmit(handleLoginUser)}
        >


            <Heading size="lg" fontWeight="bold">Faça seu logon</Heading>

            <Input 
              name="username" 
              placeholder="E-mail" 
              mt="10"
              isLoginPage 
              error={errors.email}   
              {...register('email')}
            /> 

            <Input 
              name="password" 
              type="password" 
              placeholder="Senha" 
              mt="2"
              isLoginPage 
              error={errors.password}   
              {...register('password')}
            />

            <Text mb="10" mt="2" color="red.900" fontSize="14px" w="fit-content" cursor="pointer" >Esqueci minha senha</Text>

            <Button 
              w="100%"
              h="50px"
              fontSize="sm"
              colorScheme="red"
              size="md" 
              type="submit"
              isLoading={formState.isSubmitting}
            >
              ENTRAR
            </Button>

        </Box>
      </Flex>
    </>
  )
}
