import * as request from './request';

export let findAll = (filter) => {

    let apiurl = 'https://newsapi.org/v1/articles';
    let _param = { sortBy: 'top', source: 'entertainment-weekly', apiKey: 'c53e3bc3f12b4f8ba9b7505d14a4d9f3' };
    // return request.tryNew(apiurl)
    //    .then(data => data = JSON.parse(data));

    return request.get(apiurl, _param);
}

export let detail = (id) => {


}

export let update = (data) => {

    alert('Update:' + ' - ' + data.publish_status + ' - ' + data.is_recommend + ' - ' + data.title);
    //alert(data.body_text);

}

export let updateStatus = (data) => {
    alert('Update:' + ' - ' + data.publish_status + ' - ' + data.is_recommend );
}



