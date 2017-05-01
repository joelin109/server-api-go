import * as request from './request';
import * as api from './request/api';

let baseURL = baseAPI_HTTP_URL;
let postBodyData = {
    "filter": { "page_num": 1, "page_size": 18 },
    "article_id": "besichtigen"
};

export let findAll = (filter) => {

    postBodyData.filter.page_num = filter.page;

    let _apiURL = baseURL + api.APIURL_Content_Article_List;
    let _httpBody = api.httpBody(postBodyData)

    return request.post(_apiURL, _httpBody)
        .then(data => {
            return data.result
        })
}

export let detail = (id) => {


}

export let update = (data) => {

    alert('Update:' + ' - ' + data.publish_status + ' - ' + data.is_recommend + ' - ' + data.title);
    //alert(data.body_text);
}

export let updateStatus = (data) => {

    alert('Update:' + ' - ' + data.publish_status + ' - ' + data.is_recommend);

}


