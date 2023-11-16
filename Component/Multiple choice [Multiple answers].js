// all choice content
const C_List = ["c1", "c2", "c3"];

Qualtrics.SurveyEngine.addOnReady(function () {
    // all selected choice number
    let selected = [];

    this.questionclick = function (event, element) {
        if (element.type == "checkbox") {
            let choiceNum = parseInt(element.id.split("~")[2]);
            let choiceContent = C_List[choiceNum];

            if (element.checked) {
                selected.push(choiceNum);
                // TODO: do something after checked
            } else {
                selected.splice(selected.indexOf(choiceNum), 1);
                // TODO: do something after unchecked
            }
        }
    };
});
