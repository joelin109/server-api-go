import request from './request';

let baseURL_JoeTestForReact = "http://www.belgianbeerexplorer.com";
let baseURL = baseURL_JoeTestForReact;

export let findAll = (values) => {
    let qs = "";
    if (values) {
        qs = Object.keys(values).map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(values[key]);
        }).join('&');
        qs = "?" + qs;
    }
    let apiurl = baseURL + "/products" + qs;
    /*return request({url: apiurl})
     .then(data => data = JSON.parse(data))*/

    return fetch(apiurl)
        .then(response => response.json())

}

export let findById = () => {
    return request({url: baseURL + "/products/" + id})
        .then(data => data = JSON.parse(data))
}