// default value is "on" on most Browsers
const SwitchAutoComplete = "off";

// Only numbers can be entered
const NumberOnly = false;

// "int": positive integers
// "decimal" [unfinished]: decimal point, minus sign and "int"
const NumberOnlyMode = "int";

// coordinate which you want to ban
const BanList = [
    [1, 3],
    [2, 1],
    [3, 2],
];

var questionDiv;
Qualtrics.SurveyEngine.addOnload(function () {
    questionDiv = $(this.getQuestionContainer());
    let allRows = questionDiv.querySelectorAll("table tr.ChoiceRow");

    let rows = allRows.length,
        cols = allRows[0].querySelectorAll("input[type='text']").length;
    let banTable = Array.from(Array(rows), () => Array(cols).fill(1));
    BanList.forEach((c) => {
        let x = c[0] - 1,
            y = c[1] - 1;
        banTable[x][y] = 0;
    });

    allRows.forEach((row, rindex) => {
        row.querySelectorAll("input[type='text']").forEach((input, index) => {
            input.setAttribute("autocomplete", SwitchAutoComplete);
            if (banTable[rindex][index] == 0)
                input.setAttribute("disabled", "disabled");
            if (NumberOnly) {
                input.setAttribute(
                    "onbeforeinput",
                    "numbersFilter(event,'" + NumberOnlyMode + "')"
                );
            }
        });
    });
});

function numbersFilter(event, mode) {
    let key = event.data;
    let value = event.target.value;
    let check = !event.inputType.startsWith("insert");
    switch (mode) {
        case "int":
            check = check || /[\d]/.test(key);
            break;
        case "decimal":
            // TODO: check values
            break;
        default:
            break;
    }
    if (!check) {
        event.preventDefault();
    }
}
