import { withTheme } from 'emotion-theming'
import { Box, Heading, Input, Button, Stack, Link } from '@chakra-ui/core'
import { useState } from 'react'
import DownloadableQRCode from "../components/DownloadableQRCode.js";

function GenqrPage() {
  const [ qrValue, setQrValue ] = useState('')
  return (
    <>
      <Heading/>
      <Box>
        <div>
        <DownloadableQRCode value={qrValue} />

        <div>
            <Input
            onChange={newText => {
                setQrValue(newText.target.value);
            }}
            />
        </div>
        </div>
      </Box>
    </>
  )
}
export default GenqrPage
