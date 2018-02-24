var baseUrl = 'http://127.0.0.1:8000';
var findpoolUrl = '/findpool';

function makeRequestGet(url, successCallBack, errorCallBack) {
    $.ajax({
        url: url,
        type: 'GET',
        contentType: false,
        processData: false,
        crossDomain: true,
        success: function(response) {
            //console.log(response);
            successCallBack(response);
            return false;
        },
        error: function(jqXHR, textStatus, errorMessage) {
            errorCallBack(jqXHR);
        },
    });
}

function findPool(e) {
    e.preventDefault();
    var phone = 08182299393;
    var location = '';
    var destination = '';

    makeRequestGet(baseUrl+findpoolUrl, function (data) {
        console.log(data);
    }, findFailed)
}

function afterFind(data) {
    console.log(data);
}

function findFailed() {
    console.log(data)
}