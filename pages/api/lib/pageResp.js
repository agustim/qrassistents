
const errorResponse = function(res, msg) {
    res.statusCode = 500
    res.json({ message: msg })
}

const responseJSONPage = function (res, code, msg) {
    res.statusCode = code
    res.json({ message: msg })
}

module.exports.errorResponse = errorResponse
module.exports.responseJSONPage = responseJSONPage