// default value is "on" on most Browsers
const SwitchAutoComplete = "off";

// Only numbers can be entered
const NumberOnly = false;

// "int": integers
// "decimal": decimal point, minus sign and "int"
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
                input.setAttribute("onkeyup", "checkValue(event)");
                input.setAttribute(
                    "onbeforeinput",
                    "numbersFilter(event,'" + NumberOnlyMode + "')"
                );
            }
        });
    });
});

function checkValue(event) {
    if (event.isComposing) event.target.value = "";

    const value = event.target.value;
    if (
        !value.endsWith(".") &&
        (value.startsWith("0") || (value.startsWith("-0") && value.length > 2))
    ) {
        let num = Number(value);
        event.target.value = num;
    }
}

function numbersFilter(event, mode) {
    const key = event.data;
    const value = event.target.value;

    if (event.inputType.startsWith("delete")) return;

    let check = event.inputType.startsWith("insert");
    const start = event.target.selectionStart;
    const mIndex = value.indexOf("-");
    const pIndex = value.indexOf(".");
    const mFlag = key == "-" && start == 0 && mIndex < 0;
    const pFlag = key == "." && pIndex < 0 && start - 1 > mIndex;
    if (check && mode == "int") {
        check = /[\d]/.test(key);
        check = check || mFlag;
    }
    if (check && mode == "decimal") {
        check = !isNaN(parseFloat(key) && isFinite(key));
        check = check || mFlag || pFlag;
    }
    check = check && start > mIndex;

    if (!check) {
        event.preventDefault();
    }
}
