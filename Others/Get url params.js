// 'Q_CHL', 'Q_SurveyVersionID'
// are the keys that come with Qualtrics
// and are not NECESSARY
const KEYS = ["Q_CHL", "Q_SurveyVersionID"]; // keys that need to be fetched

// Keys that require JSON serialization
const K_JSON = [];

var results = {};

Qualtrics.SurveyEngine.addOnload(function () {
    let query = window.location.search.substring(1);
    let pairs = query.split("&");
    for (let i = 0; i < pairs.length; i++) {
        let kv = pairs[i].split("=");
        let key = decodeURIComponent(kv[0]),
            value = decodeURIComponent(kv[1]);
        if (KEYS.includes(key)) results[key] = value;
        if (K_JSON.includes(key)) results[key] = JSON.parse(value);
    }
});

Qualtrics.SurveyEngine.addOnReady(function () {
    // TODO: use 'results'
    // console.log(results)
});
