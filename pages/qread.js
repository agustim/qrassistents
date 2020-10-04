import { Box, Heading, Input, Button, Text } from '@chakra-ui/core'
import dynamic from 'next/dynamic'
import {useState} from 'react'
import axios from 'axios'

const QrReader = dynamic(() => import('react-qr-reader'), {
    ssr: false
})

function IndexPage() {
    const [delay, setDelay] = useState(200);
    const [result, setResult] = useState(null)
    const [status, setStatus] = useState('read')

    var checkAssisten = async (code) => {
        if (status == 'read') {
            setStatus('wait')
        }
        const axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
        };
        const axiosData = {
            code: code
        }
        axios.post('/api/checkassistent', axiosData, axiosConfig)
        .then(
            function(result) {
              console.log(result.data)
              setResult("Usuari validat")
              setStatus('read')
            }
        ).catch(
            function(error) {
                console.error(error);
                setResult("Error en l'usuari")
                setStatus('read')
            }
        )
      };

    const handleError = function(err){
        console.error(err)
    }
    
    const handleScan = function(data){
        if (!data || data == result || status != 'read') return
        checkAssisten(data)
    }    

    const previewStyle = {
        height: 600,
        width: 600,
      }
    return (
        <>
        <Box>
            <QrReader
                delay={delay}
                style={previewStyle}
                onError={handleError}
                onScan={handleScan}
                />
        </Box>
        <Box>{result}</Box>
        </>
    )
}
export default IndexPage