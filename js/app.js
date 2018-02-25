var baseUrl = 'http://127.0.0.1:8000';
var findpoolUrl = '/findpool';


var requestData = {
    'destination' : null,
    'pickup' : null,
    'phone' : null,
    'email': null,
    'type' : null,
    'taxi': null
}

function makePostRequest(url, successCallBack, errorCallBack, data) {
    $.post(url, data, successCallBack).
    fail(function (err) {
        errorCallBack(err)
    })
}


function findPool(e) {
    e.preventDefault();
    if(isContactDataSet()){
        requestData.phone = $('#contact_phone').val(); //set phone number
        requestData.email = $('#contact_email').val(); // set email

        makePostRequest(baseUrl+findpoolUrl, afterFind, findFailed, requestData);
    }else {
        console.log("Please enter contact details first");
    }
}

function nextContactDetails(e) {
    e.preventDefault();
    if(isRideDataSet()){

        requestData.taxi = $('#taxi').val(); //set taxi type

        $('#tripInfo').addClass('hide');
        $('#userInfo').removeClass('hide');
        $('#userInfo').addClass('animated bounceInRight');
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
        requestData.pickup = place.place_id;
    });
}

function setDestination(){
    googleApiAutoComplete('destination_area', function(place){
        requestData.destination = place.place_id;
    });
}


function isRideDataSet() {
    return requestData.destination !== null
        && requestData.pickup !== null &&
        $('#taxi').val() != 'select platform'
}

function isContactDataSet() {
    return $('#contact_phone').val() !== null &&
         $('#contact_email').val() !== null &&
         $('#contact_email').val().length > 1 &&
        $('#contact_phone').val().length > 1;
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


// Bind normal buttons
Ladda.bind( '.button-demo button', { timeout: 2000 } );

// Bind progress buttons and simulate loading progress
Ladda.bind( '.progress-demo button', {
    callback: function( instance ) {
        var progress = 0;
        var interval = setInterval( function() {
            progress = Math.min( progress + Math.random() * 0.1, 1 );
            instance.setProgress( progress );

            if( progress === 1 ) {
                instance.stop();
                clearInterval( interval );
            }
        }, 200 );
    }
} );