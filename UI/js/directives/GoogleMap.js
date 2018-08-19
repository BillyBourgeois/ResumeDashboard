Directives.directive("googleMap", ['$log', 'toastr', 'uiGmapGoogleMapApi', '$timeout',
    function ($log, toastr, uiGmapGoogleMapApi, $timeout) {
        return {
            templateUrl: 'views/templates/map/google-map.html',
            require: '^ngModel',
            scope: {
                ngModel: "="
            },
            link: function (scope, element, attrs, ctrl) {
                scope.spin = true;
                scope.map = {
                    center: {
                        latitude: 40,
                        longitude: -100
                    },
                    zoom: 3
                };
                scope.marker = {
                    id: 0,
                    coords: {
                        latitude: 40,
                        longitude: -100
                    },
                    options: { draggable: false },
                    events: {

                    }
                };
                scope.spin = true;
                //when map is ready to be updated
                uiGmapGoogleMapApi.then(function (maps) {
                    scope.geocoder = new google.maps.Geocoder();
                    scope.setMarkerBasedOnZipCode = function setMarkerBasedOnZipCode(zipCode) {
                        zipCode = zipCode.toString();
                        scope.geocoder.geocode({ address: zipCode },
                            function (results_array, status) {
                                if (results_array.length > 0) {
                                    scope.marker.coords.latitude = scope.map.center.latitude = results_array[0].geometry.location.lat();
                                    scope.marker.coords.longitude = scope.map.center.longitude = results_array[0].geometry.location.lng();


                                    $timeout(function () {
                                        scope.map.zoom = 5;
                                        scope.map.center.latitude = scope.marker.coords.latitude;
                                        scope.map.center.longitude = scope.marker.coords.longitude;
                                    }, 1000);
                                }
                            });
                    };
                    scope.spin = false;
                    scope.setMarkerBasedOnZipCode(scope.ngModel);
                });



            }
        }
    }]);

