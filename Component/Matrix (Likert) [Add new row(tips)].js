// html content on scale column (first column)
const HEAD_SCALE = "<strong>scale</strong>";

// all tips that you want to add
const HEAD_TIPS = [
    {
        content: "tip1", // html content
        span: 2, // col span
    },
    {
        content: "<em>tip2</em>",
        span: 1,
    },
];

var questionDiv;
Qualtrics.SurveyEngine.addOnload(function () {
    questionDiv = $(this.getQuestionContainer());

    let matHead = questionDiv.querySelector("table thead");
    let newRow = document.createElement("tr");
    let newHead = document.createElement("th");
    let newScale = document.createElement("span");
    newScale.innerHTML = HEAD_SCALE;
    newHead.appendChild(newScale);
    newHead.style.textAlign = "left";
    newHead.style.paddingLeft = "20px";
    newHead.style.paddingTop = "0px";
    newRow.appendChild(newHead);
    matHead.appendChild(newRow);

    // load tips
    for (let i = 0; i < HEAD_TIPS.length; i++) {
        let tip = HEAD_TIPS[i];
        let cell = document.createElement("th");
        let content = document.createElement("span");
        content.innerHTML = tip.content;
        cell.setAttribute("colspan", tip.span);
        cell.appendChild(content);
        newRow.appendChild(cell);
    }
});
