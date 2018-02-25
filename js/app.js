var baseUrl = 'http://127.0.0.1:8000';
var findpoolUrl = '/findpool';


var locations = {
    'destination' : null,
    'pickup' : null
}

function makeRequestGet(url, successCallBack, errorCallBack, data) {
    $.post(url, data, successCallBack).
    fail(function (err) {
        errorCallBack(err)
    })
}

function findPool(e) {
    e.preventDefault();
    var phone = 08182299393;
    if(locations.destination !== null && locations.pickup !== null){
        makeRequestGet(baseUrl+findpoolUrl, afterFind, findFailed, locations)
    }else {
        console.log("Please set location first");
    }
}

function afterFind(data) {
    console.log(data);
}

function findFailed(data) {
    console.log(data)
}


function setPickLocation() {
    googleApiAutoComplete('pickup_area', function(place){
        locations.pickup = place.place_id;
    });
}

function setDestination(){
    googleApiAutoComplete('destination_area', function(place){
        locations.destination = place.place_id;
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