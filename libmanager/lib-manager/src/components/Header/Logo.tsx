import { Flex, Text } from "@chakra-ui/react";
import Image from 'next/image'
import LogoImg from '../../../public/logo.png'

type LogoProps = {
  showLogoText: boolean;
}

export function Logo({ showLogoText }: LogoProps) {
  return (
    <Flex align="center">
      <Image src={LogoImg} alt="logo"  />
      { showLogoText && <Text fontSize={18} fontWeight="bold" ml={6}>LibManager</Text> }
    </Flex>
  )
}