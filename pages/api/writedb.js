const GithubDB = require('github-db').default;

const errorResponse = function(res, msg) {
    res.statusCode = 500
    res.json({ message: msg })
}

const responseJSONPage = function (res, code, msg) {
    res.statusCode = code
    res.json({ message: msg })
}

export default (req, res) => {

    const personalAccessToken = process.env.GH_TOKEN

    var options = {
        owner: process.env.GH_USER,
        repo: process.env.GH_REPO,
        path: process.env.GH_PATHFILE
    };

    console.log(personalAccessToken)
    console.log(options)

    var githubDB = new GithubDB(options);

    if (!githubDB.auth(personalAccessToken)) {
        errorResponse(res,"No token")
        return
    }
    githubDB.connectToRepo()
    .then(null, (error) => {
        errorResponse(res,error)
        return
    })
    githubDB.find({hello: "world"})
    .then((data) => {
        console.log(data)
    }, (error) => {
        console.log("Error:" + error)
        errorResponse(res, error)
        return
    })
    githubDB.save({"message": "wooohoo"})
    .then((data) => {
        console.log(data)
    }, (error) => {
        console.log("Error:" + error)
        errorResponse(res, error)
        return
    })
    responseJSONPage(res, 200, "OK")
}


