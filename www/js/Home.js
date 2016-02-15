var myApp = angular.module('myApp', []);

myApp.controller("controller", function($scope){
	
	// Fetch Device info from Device Plugin
	$scope.alertDeviceInfo = function() {
		
        window.location = "joinUs.html"
	};

	// Fetch location info from GeoLocation Plugin
	$scope.alertGeoLocation = function() {
		var onSuccess = function(position) {
			navigator.notification.alert('Latitude: '
					+ position.coords.latitude + '\n' + 'Longitude: '
					+ position.coords.longitude + '\n' + 'Altitude: '
					+ position.coords.altitude + '\n' + 'Accuracy: '
					+ position.coords.accuracy + '\n' + 'Altitude Accuracy: '
					+ position.coords.altitudeAccuracy + '\n' + 'Heading: '
					+ position.coords.heading + '\n' + 'Timestamp: '
					+ position.timestamp + '\n');
		};
		navigator.geolocation.getCurrentPosition(onSuccess);

	};

	// Makes a beep sound
	$scope.beepNotify = function() {
		navigator.notification.beep(1);
	};

	// Vibrates the phone
	$scope.vibrateNotify = function() {
		navigator.notification.vibrate(1000);
	};
});
