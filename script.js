function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 39.8283, lng: -98.5795},
        zoom: 4
    });

    var hospitals = [
        {
            name: "Johns Hopkins Hospital",
            location: {lat: 39.297, lng: -76.592}
        },
        {
            name: "Massachusetts General Hospital",
            location: {lat: 42.363, lng: -71.069}
        },
        {
            name: "UCSF Medical Center",
            location: {lat: 37.763, lng: -122.458}
        },
        {
            name: "Cleveland Clinic",
            location: {lat: 41.503, lng: -81.620}
        },
        {
            name: "Mayo Clinic",
            location: {lat: 44.022, lng: -92.467}
        }
    ];

    hospitals.forEach(function(hospital) {
        var marker = new google.maps.Marker({
            position: hospital.location,
            map: map,
            title: hospital.name
        });
    });
}
