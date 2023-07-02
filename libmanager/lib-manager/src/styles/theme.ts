import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({ 
  colors: {
    red: {
      "900": "#FD4D4D"
    },
    gray: {
      "100":"#E1E1E6",
      "200":"#A8A8B3",
      "400":"#737380",
      "800":"#202024",
      "900":"#121214"
    }
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto'
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.100',
      }
    }
  }
 })