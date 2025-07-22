function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 6.995, lng: 3.355},
        zoom: 10
    });

    var hospitals = [
        {
            name: "Federal Medical Centre, Abeokuta",
            location: {lat: 7.15, lng: 3.35}
        },
        {
            name: "Olabisi Onabanjo University Teaching Hospital",
            location: {lat: 6.883, lng: 3.633}
        },
        {
            name: "State Hospital, Ijaye, Abeokuta",
            location: {lat: 7.15, lng: 3.333}
        },
        {
            name: "Sacred Heart Hospital, Lantoro, Abeokuta",
            location: {lat: 7.167, lng: 3.35}
        },
        {
            name: "General Hospital, Sokenu, Abeokuta",
            location: {lat: 7.15, lng: 3.367}
        }
    ];

    hospitals.forEach(function(hospital) {
        var marker = new google.maps.Marker({
            position: hospital.location,
            map: map,
            title: hospital.name
        });
    });

    document.getElementById('search-button').addEventListener('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                findClosestHospital(userLocation);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    });

    function findClosestHospital(userLocation) {
        var closestHospital = null;
        var shortestDistance = Infinity;

        hospitals.forEach(function(hospital) {
            var distance = getDistance(userLocation, hospital.location);
            if (distance < shortestDistance) {
                shortestDistance = distance;
                closestHospital = hospital;
            }
        });

        $('#hospital-modal .modal-body').text("The closest hospital is " + closestHospital.name);
        $('#hospital-modal').modal('show');
    }

    function getDistance(p1, p2) {
        var R = 6371; // Radius of the Earth in km
        var dLat = (p2.lat - p1.lat) * Math.PI / 180;
        var dLon = (p2.lng - p1.lng) * Math.PI / 180;
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }
}
