import * as request from './request';
import * as api from './request/api';

let baseURL = baseAPI_HTTP_URL;
let postData = baseAPI_HTTP_BodyData;

export let findAll = (filter, bodyData) => {

    let _apiURL = baseURL + api.APIURL_Content_Dictionary_List;
    let _httpBody = api.httpBody(postData)

    return request.post(_apiURL, _httpBody)
        .then(data => {
            return data.result
        })
}



exports.getTagTitle = (tagID) => {

    let _tag = {
        "t10001": "ars-technica",
        "t10002": "buzzfeed",
        "t10003": "cnn",
        "t10004": "der-tagesspiegel",
        "t10005": "google-news",
        "t10006": "bbc-news",
        "t10007": "entertainment-weekly",
        "t10008": "the-new-york-times",
        "t10009": "wired-de"
    }

    return _tag[tagID];
}
