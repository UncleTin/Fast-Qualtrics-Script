// display content
const C_Display = ["c1 display", "c2 display", "c3 display"];

// 'true': Replace content in HTML
const C_Replace = [false, false, false];

var questionContainer;
Qualtrics.SurveyEngine.addOnload(function () {
    questionContainer = $(this.getQuestionContainer());

    let allChoiceContent = questionContainer.querySelectorAll(
        "ul.ChoiceStructure li span.LabelWrapper span"
    );

    allChoiceContent.forEach((elem, index) => {
        elem.innerHTML = C_Replace[index] ? C_Display[index] : elem.innerHTML;
    });
});
