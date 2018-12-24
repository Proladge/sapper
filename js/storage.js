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
        return this.getAllResults().then(resultsSnapShot => {
            const results = resultsSnapShot.val();
            let resultArray = [];
            for(var user in results) {
                var userResults = results[user];
                for(var res in userResults) {
                    resultArray.push({ user, ...userResults[res] });
                }
            }
            console.log(results);
            debugger;
            return resultArray.sort((r1, r2) => r1.mseconds - r2.mseconds);
        });

    }

    getAllResults() {
        const resultsRef = firebase.database().ref("results");
        return resultsRef.once("value");
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