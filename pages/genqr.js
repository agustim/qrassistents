import { withTheme } from 'emotion-theming'
import { Box, Heading, Input, Text, Button, Stack, Link } from '@chakra-ui/core'
import { useState } from 'react'
import DownloadableQRCode from "../components/DownloadableQRCode.js";
import axios from 'axios'

function GenqrPage() {
  const [ qrValue, setQrValue ] = useState('')
  const [ token, setToken ]  = useState('')

  const Generate = function(){
    const axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };
    const axiosData = {
        code: qrValue,
        token: token
    }
    axios.post('/api/createassistent', axiosData, axiosConfig)
    .then(
      function(result) {
        console.log(result.data)
      }
    ).catch(
      function(error) {
          console.error(error);
      }
    )
  }

  return (
    <>
      <Heading/>
      <Box>
        <div>
        <DownloadableQRCode value={qrValue} />

        <div>
          <Box>
            <Text>Id:</Text>
            <Input
            onChange={newText => {
              setQrValue(newText.target.value);
            }} value={qrValue}
            />
          </Box>
          <Box>
            <Text>Token:</Text>
            <Input
            onChange={e => {
              setToken(e.target.value);
            }} value={token}
            />
          </Box>  
          <Box>
            <Button onClick={Generate}>Generate</Button>
          </Box>            
        </div>
        </div>
      </Box>
    </>
  )
}
export default GenqrPage
