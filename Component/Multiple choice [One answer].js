// all choice content
const C_List = ["c1", "c2", "c3"];

Qualtrics.SurveyEngine.addOnReady(function () {
    this.questionclick = function (event, element) {
        if (element.type == "radio") {
            let choiceNum = parseInt(element.id.split("~")[2]);
            let choiceContent = C_List[choiceNum];

            if (element.checked) {
                // TODO: do something after checked
            }
        }
    };
});
