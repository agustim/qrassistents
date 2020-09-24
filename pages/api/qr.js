const qrcode = require('qrcode');

export default async (req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type','text/html')
    const image = await qrcode.toDataURL('http://omnium.cat');
    res.send(`<html><body><img width=300px src="${image}"/></body></html>`)
}
  