var myApp = angular.module('myApp', []);

myApp.controller("controller", function($scope ){
	
     $scope.submit = function()
    {
       //alert('insert into Personal_details ( `email_id` , Volitear , Prefixs , First_nm , Middle_nm , Last_nm ) values ("'+$scope.email.text+'" , "' + $scope.myColor.name + '" , "'+$scope.myPrefix.name+'" , "'+$scope.fname.text+'" ,  "'+$scope.mname.text+'" , "'+$scope.lname.text+'")');
         
         var db = window.openDatabase("myDatabase.db", "1.0", "Cordova Demo", 200000);
        db.transaction(populateDB, errorCB, successCB);
         //db.transaction(queryDB, errorCB);
        
    };
    
    ////////////////////Varible Declaration////////////////////////////////
    $scope.prefixs = [
        {name:'Select'},
        {name:'Dr.'},
        {name:'Mr.'},
        {name:'Mrs.'}
      
    ];
    $scope.myPrefix = $scope.prefixs[0];
	// Fetch Device info from Device Plugin
    

    
	$scope.alertDeviceInfo = function() {
		
        window.location = "joinUs.html"
	};

    $scope.colors = [
      {name:'Yes'},
      {name:'No'}
      
    ];
    $scope.myColor = $scope.colors[0];
    
    $scope.myFun = function ()
    {
      //alert($scope.myColor.name);
       //var db = window.openDatabase("myDatabase.db", "1.0", "Cordova Demo", 200000);
        //db.transaction(populateDB, errorCB, successCB);
        // db.transaction(queryDB, errorCB);
      
    };
    
    
    queryDB = function (tx) {
        //tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
        tx.executeSql('SELECT * FROM Personal_details', [], querySuccess, errorCB);
    };

    // Query the success callback
    //
    querySuccess = function (tx, results) {
        console.log("Returned rows = " + results.rows.length);
        for (var i=0; i<results.rows.length; i++){
        console.log("Row = " + i + " ID = " + results.rows.item(i).email_id + " Data =  " + results.rows.item(i).First_nm);
        }
        // this will be true since it was a select statement and so rowsAffected was 0
        if (!results.rowsAffected) {
            console.log('No rows affected!');
            return false;
        }
        // for an insert statement, this property will return the ID of the last inserted row
        console.log("Last inserted row ID = " + results.insertId);
    };
    
    
     populateDB = function(tx) {
         tx.executeSql('DROP TABLE IF EXISTS DEMO');
         tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
         tx.executeSql("CREATE TABLE IF NOT EXISTS Personal_details (	`email_id`	TEXT,	`Volitear`	TEXT,	`Prefixs`	TEXT,	`First_nm`	TEXT,	`Middle_nm`	TEXT,	`Last_nm`	TEXT,	PRIMARY KEY(email_id))");
         
         tx.executeSql('insert into Personal_details ( `email_id` , Volitear , Prefixs , First_nm , Middle_nm , Last_nm ) values ("'+$scope.email.text+'" , "' + $scope.myColor.name + '" , "'+$scope.myPrefix.name+'" , "'+$scope.fname.text+'" ,  "'+$scope.mname.text+'" , "'+$scope.lname.text+'")');
         tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
         tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
    };

    // Transaction error callback
    //
     errorCB = function(tx, err) {
        alert("Error processing SQL: "+err);
    };

    // Transaction success callback
    //
     successCB = function () {
        alert("success!");
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
