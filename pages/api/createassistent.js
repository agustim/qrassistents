const { Octokit } = require("@octokit/rest");
const personalAccessToken = process.env.GH_TOKEN
const pageResp = require('./lib/pageResp')
const authToken = process.env.AUTHTOKEN

export default async (req, respon) => {
    if ((authToken) && (authToken != null)) {
        if (req.body.token != authToken){
            return pageResp.errorResponse(respon, "AuthToken is wrong")
        }    
    } 
    if (!req.body.code) {
        return pageResp.errorResponse(respon, "Not code parameter.")
    }
    var filename = req.body.code.replace(/[^a-zA-Z0-9]/g, "") + ".json"
    if (filename.length <= 0) {
        return pageResp.errorResponse(respon, "Code parameter is emtpy.")
    }
    var options = {
        owner: process.env.GH_USER,
        repo: process.env.GH_REPO,
        path: process.env.GH_PATH + filename
    };

    const octokit = new Octokit({
        auth: "token " + personalAccessToken,
    });

    let res = null
    try {
        res = await octokit.repos.getContent(options)
    } catch(e) {
        // Not exist file, so we need to create it.
    }
    if (res) {
        return pageResp.errorResponse(respon, `The register [${filename}] already exist.`)
    }

    var obj = Object.assign(options,{
        message: `Create ${filename}`,
        content: Buffer.from(JSON.stringify({assitent: false})).toString('base64'),
    })

    octokit.repos.createOrUpdateFileContents(
        obj
    )
    .then((data) => {
        console.log(data)
        pageResp.responseJSONPage(respon, 200, data)
        return
    }, (error) => {
        console.log("ERROR:" + error)
        pageResp.errorResponse(respon, error)
        return
    })
}



