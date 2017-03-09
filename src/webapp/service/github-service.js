import request from './request';


export let findAll = (values) => {

    let apiurl = 'https://api.github.com/search/repositories?q=created:%3E2013-03-01%20language:javascript%20stars:>=5000&sort=stars';
    /*return request({url: apiurl})
     .then(data => data = JSON.parse(data))*/

    return fetch(apiurl)
        .then(response => response.json())

}