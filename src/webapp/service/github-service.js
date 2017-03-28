import request from './request';
//import { api_result_js, api_result_ts } from './../setting/data/github'
//import { api_result_go, api_result_py } from './../setting/data/github2'


const api_github_js = 'https://api.github.com/search/repositories?q=created:%3E2013-03-01%20language:javascript%20stars:%3E=3000&sort=stars';
const api_github_ts = 'https://api.github.com/search/repositories?q=created:%3E2013-03-13%20language:typescript%20stars:%3E=3000&sort=stars';
const api_github_go = 'https://api.github.com/search/repositories?q=created:%3E2013-03-01%20language:golang%20stars:%3E=3000&sort=stars';
const api_github_py = 'https://api.github.com/search/repositories?q=created:%3E2013-03-01%20language:python%20stars:%3E=3000&sort=stars';

export let findAll = (data) => {


    let _apiBase = 'https://api.github.com/search/repositories?q=created:%3E';
    let apiurl = 'https://api.github.com/search/repositories?q=created:%3E2013-03-01%20language:javascript%20stars:>=3000&sort=stars&page=2';
    /*return request({url: apiurl})
     .then(data => data = JSON.parse(data))*/

    /*return fetch(apiurl)
        .then(response => response.json())*/

    let _page = data.page;
    let _language = data.filter.language.toLowerCase();
    let _createdAt = _toString(data.filter.created_at);
    let _star = data.filter.star;
    let _isCache = false;//data.filter.is_cache;

    if (typeof (_isCache) !== "undefined" && _isCache === false) {

        apiurl = _apiBase + _createdAt + '%20language:' + _language + '%20stars:>=' + _star + '&sort=stars&page=' + _page;
        return fetch(apiurl)
            .then(response => response.json())
       // alert(apiurl)
    }
    else {

        let api_result = api_result_js;
        switch (_language) {
            case "golang":
                api_result = api_result_go;
                break;
            case "python":
                api_result = api_result_py;
                break;
            case "typescript":
                api_result = api_result_ts;
                break;
            default:
                break;
        }

        return _asyncDemo(apiurl)
            .then(data => {
                return api_result
            })
    }

}



function _asyncDemo(api) {
    var promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('asyncFn1 is done');
            resolve('asyncFn1 value');
        }, 1000);
    });
    return promise;
}

function _toString(date) {
    let _createdAt = "2013-03-13";

    if (typeof (date) !== "undefined" && date !== null) {
        let _year = date.getFullYear();
        let _month = date.getMonth() + 1;
        let _day = date.getDate();
        _createdAt = _year + "-" + (_month >= 10 ? _month : '0' + _month) + "-" + (_day >= 10 ? _day : '0' + _day);
    }

    return _createdAt
}