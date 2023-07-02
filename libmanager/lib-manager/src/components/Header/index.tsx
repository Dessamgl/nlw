import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

export function Header() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box bg="#202024">
      <Flex
        as="header"
        height="20"
        width="100%"
        maxWidth={1480}
        marginX="auto"
        paddingX="6"
        align="center"
        justifyContent="space-between"
      >
          { isWideVersion && <Logo showLogoText={isWideVersion}/>}

          <SearchBox />

          <Profile showProfileData={isWideVersion}/>
      </Flex>
    </Box>
  )
}