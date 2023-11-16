// Get Current Loop Number
const LOOP_NUM = parseInt("${lm://CurrentLoopNumber}");

// Get Fields
const Fields = ["${lm://Field/1}", "${lm://Field/2}", "${lm://Field/3}"];

// Example
const LAST_NUM = 3;

Qualtrics.SurveyEngine.addOnReady(function () {
    if (LOOP_NUM % 2 == 0) {
        alert("even round, field 2 is " + Fields[1]);
    } else {
        alert("odd round, field 1 is " + Fields[0]);
    }

    if (LOOP_NUM == LAST_NUM) {
        alert("last round, field 3 is " + Fields[2]);
    }
});
