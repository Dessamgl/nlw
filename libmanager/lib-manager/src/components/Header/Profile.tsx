import { Flex, Box, Text, Avatar } from '@chakra-ui/react';

type ProfileProps = {
  showProfileData?: boolean,
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      { showProfileData && 
        <Box textAlign="right">
          <Text>Guilherme Capitão</Text>
          <Text
            color="gray.200"
            fontSize="small"
          >
            guilherme.capitao95@rocketseat.team</Text>
        </Box>  
      }

      <Avatar
      size="md"
      name="Guilherme Capitão"
      src="https://github.com/guilhermecapitao.png"
      border="2px solid"
      color="red.900"
      ml="4"
      >

      </Avatar>
    </Flex>
  )
} 