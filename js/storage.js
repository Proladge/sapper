const config = {
    apiKey: "AIzaSyB_xPpHBimhxfbqSVMM3cSyQRjmkQKx55Y",
    authDomain: "saper-564b8.firebaseapp.com",
    databaseURL: "https://saper-564b8.firebaseio.com",
    projectId: "saper-564b8",
    storageBucket: "saper-564b8.appspot.com",
    messagingSenderId: "1004050185007"
  };
class Storage {
    constructor() {
        firebase.initializeApp(config);
        this.db = firebase.database();
    }

    SaveResult(name, result) {
        result.date = Date.now();
        this.getIPInfo().then( ({ip_address, city, country, latitude, longitude }) => 
                this.addUser(name, ip_address , {city, country, latitude, longitude}, result)
            );

    }

    getUserInfo(userName) {
        this.db.ref("users/" + userName).once("value")
            .then(function(snapshot) {
                var name = snapshot.child("name").val(); // {first:"Ada",last:"Lovelace"}

                console.log(snapshot);
                // var firstName = snapshot.child("name/first").val(); // "Ada"
                // var lastName = snapshot.child("name").child("last").val(); // "Lovelace"
                // var age = snapshot.child("age").val(); // null
            });
    }

    getTopScores(amount) {

    }

    getLastGames(amount) {

    }

    getMostActiveUsers(amount) {

    }

    addUser(userName, ip, location, result) {
        debugger;
        const usersRef = firebase.database().ref("users/" + userName);
        const resultsRef = firebase.database().ref("results/" + userName);
        usersRef.once("value")
        .then(function(snapshot) {
            const record = {ip, location, date: Date.now()}
            if(!snapshot.exists()) {
                usersRef.set(record);
            }
            let resultsRef =  snapshot.child("results");
            var newResultRef = firebase.database().ref("results/" + userName).push();
            // var newResultRef = resultsRef.push();
            newResultRef.set(result);
        });
    }

    addGame(user, result, mode){

    }

    getIPInfo() {
       return fetch('https://ipfind.co/me?auth=50e887ce-e3bb-4f00-a9b9-667597db5539')
            .then(res => res.json());
    }
}


var a = {
    as: "AS25500 Association of users of Ukrainian Research & Academic Network ",
city: "Kiev",
country: "Ukraine",
countryCode: "UA",
isp: "NTUU-KPI 237",
lat: 50.4501,
lon: 30.5234,
org: "National Technical University of Ukraine",
query: "77.47.237.11",
region: "30",
regionName: "Kyiv City",
status: "success",
timezone: "Europe/Kiev",
zip: ""
}