exports.APIURL_Content_Channel_List = "/api/content/channel/list"
exports.APIURL_Content_Channel_Post = "/api/content/channel/post"
exports.APIURL_Content_Article_List = "/api/content/article/list"
exports.APIURL_Content_Article_Detail = "/api/content/article/detail"
exports.APIURL_Content_Article_Post = "/api/content/article/post"
exports.APIURL_Content_Article_Remove = "/api/content/article/remove"
exports.APIURL_Content_Article_Status_Update = '/api/content/article/status_update'
exports.APIURL_Content_Dictionary_List = "/api/content/dictionary/list"
exports.APIURL_Content_Dictionary_Detail = "/api/content/dictionary/detail"
exports.APIURL_Content_Dictionary_Post = "/api/content/dictionary/post"
exports.APIURL_Content_Dictionary_Remove = "/api/content/dictionary/remove"

exports.httpBody = (bodyData) => {

    let _data = bodyData
    let _body = {
        "token": "1384595117-ddc161cb-3b93-4809-a54e-07ac49189737-178953",
        "sitecode": "colr.ios.phone",
        "channel": "",
        "locale": "zh_CN",
        "appver": 10000,
        "data": _data
    }

    return _body;
}


