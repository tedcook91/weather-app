//Get Weather
var darkskyKey = config.darkskyKey;
var googleKey = config.googleKey;


function skycons() {
	var i,
			icons = new Skycons({
				"color" : "#db8229",
				"resizeClear": true
			}),
			list  = [
				"clear-day",
				"clear-night",
				"partly-cloudy-day",
				"partly-cloudy-night",
				"cloudy",
				"rain",
				"sleet",
				"snow",
				"wind",
				"fog"
			];


	for(i = list.length; i--;) {
		var weatherType = list[i],
				elements    = document.getElementsByClassName( weatherType );

		for (e = elements.length; e--;) {
			icons.set(elements[e], weatherType);
		}
	}
	icons.play();
}

function weatherReport(latitude, longitude) {
  var url = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/',
      lat = latitude,
      lon = longitude,
      api_call = url + darkskyKey + "/" + lat + "," + lon;




  $.getJSON(api_call, function(forecast){
    console.log(forecast)
    var current_temp = forecast.currently.temperature;
    var current_summary = forecast.currently.summary;
    var current_skicon = forecast.currently.icon;
    var current_time = new Date(forecast.currently.time * 1000);
console.log(current_temp)

    $("#forecast").append(
      '<div class="column"' +
			'<li class=shade-'+ current_skicon+'><div>' +
      '<div>Temperature: '+ current_temp+'</div>'+
      '<div>Summary: '+ current_summary+'</div>'+
      '<div>Time: '+ current_time.toLocaleTimeString()+'</div>' +
      '<div class="graphic"><canvas class='+ current_skicon+'></canvas></div>'+
			'</div></div></div>'
    );
    skycons();

  });

};


$('button').on('click', function(e){
          var lat = $('#latitude').val(),
              lon = $('#longitude').val(),
              city_name = $('#city-search').val()

    if(lat && lon !== '') {
      e.preventDefault();

      $('form').fadeOut(100, function() {
        weatherReport(lat, lon);
        $('.container').append('<button class="button" id="back">New Forecast</button><h3 class="city">' + city_name + '</h3><ul id="forecast"></ul>');
      })
    }
});

$('body').on('click', '#back', function() {
    window.location.reload(true);
})

function insertGoogleScript() {
    var google_api = document.createElement('script');


    google_api.src = 'https://maps.googleapis.com/maps/api/js?key='+ googleKey +'&callback=initGoogleAPI&libraries=places,geometry';
    document.body.appendChild(google_api);
}

function initGoogleAPI() {
    var autocomplete = new google.maps.places.SearchBox(document.querySelector("#city-search"));

    autocomplete.addListener('places_changed', function() {
      var place = autocomplete.getPlaces()[0];
      document.querySelector("#latitude").value = place.geometry.location.lat();
      document.querySelector("#longitude").value = place.geometry.location.lng();
    })
}

insertGoogleScript();
