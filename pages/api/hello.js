// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.statusCode = 200
  res.json({ cookies: JSON.stringify(req.cookies), body: JSON.stringify(req.body), query: JSON.stringify(req.query) })
}
