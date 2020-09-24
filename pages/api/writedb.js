const { Octokit } = require("@octokit/rest");
const personalAccessToken = process.env.GH_TOKEN
const btoa = require("btoa-lite");

const errorResponse = function(res, msg) {
    res.statusCode = 500
    res.json({ message: msg })
}

const responseJSONPage = function (res, code, msg) {
    res.statusCode = code
    res.json({ message: msg })
}

export default async (req, respon) => {

    var options = {
        owner: process.env.GH_USER,
        repo: process.env.GH_REPO,
        path: process.env.GH_PATHFILE
    };

    const octokit = new Octokit({
        auth: "token " + personalAccessToken,
    });

    let res = await octokit.repos.getContent(options)

    var obj = Object.assign(options,{
        message: "create test.txt " + Date.now(),
        content: btoa("Test content " + Date.now()),
    })
    if (res) {
        obj = Object.assign(obj, { sha: res.data.sha })
    }

    console.log(obj)
    octokit.repos.createOrUpdateFileContents(
        obj
    )
    .then((data) => {
        console.log(data)
        responseJSONPage(respon, 200, data)
        return
    }, (error) => {
        console.log("ERROR:" + error)
        errorResponse(respon, error)
        return
    })
}



