const { Octokit } = require("@octokit/rest");
const personalAccessToken = process.env.GH_TOKEN
const pageResp = require('./lib/pageResp')

export default async (req, respon) => {
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
        // Not exist file, so this assistent does not exist.     
    }
    if (!res) {
        return pageResp.errorResponse(respon, `I can not find this register. [${filename}]`)
    }

    var content = Buffer.from(res.data.content, 'base64').toString()
    try {
        content = JSON.parse(content)
    } catch (e) {
        return pageResp.errorResponse(respon, `Unespected parameters.`)
    }

    if (content && content.assitent) {
        return pageResp.responseJSONPage(respon, 401, "Assisten ja validat.")
    }

    var reg = {assitent: true, register_date: Date.now()}
    var obj = Object.assign(options,{
        message: `Register ${filename}`,
        content: Buffer.from(JSON.stringify(reg)).toString('base64'),
        sha: res.data.sha
    })

    octokit.repos.createOrUpdateFileContents(
        obj
    )
    .then((data) => {
//        console.log(data)
        pageResp.responseJSONPage(respon, 200, data)
        return
    }, (error) => {
//        console.log("ERROR:" + error)
        pageResp.errorResponse(respon, error)
        return
    })
}



