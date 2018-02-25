var baseUrl = 'http://127.0.0.1:8000';
var findpoolUrl = '/findpool';


var locations = {
    destination : null,
    pickup : null
}

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


function setPickLocation() {
    googleApiAutoComplete('pickup_area', function(place){
        locations.pickup = place.id;
    });
}

function setDestination(){
    googleApiAutoComplete('destination_area', function(place){
        locations.destination = place.id;
    });
}

function googleApiAutoComplete(formId, callBack) {

    var input = document.getElementById(formId);
    var options = {
        //strictBounds: true,
        types: ['geocode']
    };
    var autocomplete = new google.maps.places.Autocomplete(input, options);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }

    autocomplete.addListener('place_changed', function () {
        callBack(autocomplete.getPlace());
        console.log(autocomplete.getPlace());
    });
}