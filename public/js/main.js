$(function initializeMap (){

  var fullstackAcademy = new google.maps.LatLng(40.705086, -74.009151);

  var styleArr = [{
    featureType: 'landscape',
    stylers: [{ saturation: -100 }, { lightness: 60 }]
  }, {
    featureType: 'road.local',
    stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
  }, {
    featureType: 'transit',
    stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
  }, {
    featureType: 'administrative.province',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'water',
    stylers: [{ visibility: 'on' }, { lightness: 30 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
  }];

  var mapCanvas = document.getElementById('map-canvas');

  var currentMap = new google.maps.Map(mapCanvas, {
    center: fullstackAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  });

  var iconURLs = {
    hotel: '/images/lodging_0star.png',
    restaurant: '/images/restaurant.png',
    activity: '/images/star-3.png'
  };

  function drawMarker (type, coords) {
    var latLng = new google.maps.LatLng(coords[0], coords[1]);
    var iconURL = iconURLs[type];
    var marker = new google.maps.Marker({
      icon: iconURL,
      position: latLng
    });
    marker.setMap(currentMap);
    return marker;
  }
  let markerObj = {};
  // drawMarker('hotel', [40.705137, -74.007624]);
  // drawMarker('restaurant', [40.705137, -74.013940]);
  // drawMarker('activity', [40.716291, -73.995315]);
  $("button[data-action='add']").on("click", function(event){
    let closest = $(this).closest('div').attr('class');
    let selected = $(this).closest('div').find(":selected").text();
    let array;

    switch(closest){
      case "hotel":
      array = hotels;
      break;

      case "restaurant":
      array = restaurants;
      break;

      case "activity":
      array = activities;
      break;
    }

    array.forEach(item => {
      if(item.name === selected){
        let obj = item; 
    $('.my-' + closest).append('<span class="title">' + obj.name + '</span><button data-action="remove" class="btn btn-xs btn-danger remove btn-circle">x</button>')
    markerObj[obj.name] = drawMarker(closest, obj.place.location);
    }
  });
});

  $('#itinerary').on("click", ".remove", function(){
     let key = $(this).prev()[0].innerHTML;
     let marker = markerObj[key];
     marker.setMap(null);
     $(this).prev().remove();
     $(this).remove();

  });

});

hotels.forEach(hotel => {
    $('#hotel-choices').append('<option>' + hotel.name + '</option>')
  });

restaurants.forEach(restaurant => {
    $('#restaurant-choices').append('<option>' + restaurant.name + '</option>')
  });

activities.forEach(activity => {
    $('#activity-choices').append('<option>' + activity.name + '</option>')
  });

$('#day-add').on('click', function(event){
  let day = $(this).prev()[0].innerHTML;
  $('<button class="btn btn-circle day-btn current-day">' + (+day+1) + '</button>').appendTo('.day-buttons');
  console.log(day)
})

