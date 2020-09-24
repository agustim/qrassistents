import { withTheme } from 'emotion-theming'
import { Box, Heading, Text, Button, Stack, Link } from '@chakra-ui/core'

function IndexPage() {
  return (
    <>
      <Heading/>
      <Box>
        <Text>
          Que vols fer?
        </Text>
        <Stack spacing={4} direction="row" align="center">
          <Link href="/qread">
            <Button colorScheme="teal" size="md">
              Read
            </Button>
          </Link>
          <Link href="/genqr">
          <Button colorScheme="teal" size="md">
            Generate
          </Button>
          </Link>
        </Stack>
      </Box>
    </>
  )
}
export default IndexPage
