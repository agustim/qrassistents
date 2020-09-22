import { Box, Heading, Input, Button, Text } from '@chakra-ui/core'
import dynamic from 'next/dynamic'
import {useState} from 'react'

const QrReader = dynamic(() => import('react-qr-reader'), {
    ssr: false
})

function IndexPage() {
    const [delay, setDelay] = useState(200);
    const [result, setResult] = useState('No result');

    const handleError = function(err){
        console.error(err)
    }
    
    const handleScan = function(data){
        if (!data) return
        setResult(data)
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