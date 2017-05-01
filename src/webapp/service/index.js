import * as request from './request';
import * as api from './request/api';

let baseURL = baseAPI_HTTP_URL;
let postData = baseAPI_HTTP_BodyData;

export let findAll = (filter, bodyData) => {

    let _apiURL = baseURL + api.APIURL_Content_Dictionary_List;
    let _httpBody = httpBody(postData)

    return request.post(_apiURL, _httpBody)
        .then(data => {
            return data.result
        })
}

function httpBody(bodyData) {
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
