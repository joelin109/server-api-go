import * as request from './request/api';

export let findAll = (filter) => {
    let _source = '&source=entertainment-weekly';
    let _apiKey = '&apiKey=c53e3bc3f12b4f8ba9b7505d14a4d9f3';
    let apiurl = 'https://newsapi.org/v1/articles?sortBy=top' + _apiKey + _source;

    return request.get(apiurl);

}

export let create = (data) => {


}

export let update = (data) => {


}

export let articleDetail = (id) => {


}

