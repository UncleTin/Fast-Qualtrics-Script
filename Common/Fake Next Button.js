var questionContainer;
Qualtrics.SurveyEngine.addOnload(function () {
    questionContainer = $(this.getQuestionContainer());
});

Qualtrics.SurveyEngine.addOnReady(function () {
    let btnDiv = jQuery("div#Buttons")[0];
    let fakeButton = document.createElement("button");
    fakeButton.setAttribute("type", "button");
    fakeButton.setAttribute("id", "FakeNextButton");
    fakeButton.setAttribute("aria-label", "Next");
    fakeButton.classList.add("NextButton");
    fakeButton.classList.add("Button");
    fakeButton.classList.add("btn-fake-next");
    fakeButton.innerText = "→";
    btnDiv.appendChild(fakeButton);

    jQuery("button.btn-fake-next").click(function () {
        this.setAttribute("disabled", "disabled");
        let divError = questionContainer.querySelector("div.ValidationError");

        let pass = true,
            msg = "success";
        // TODO: do something before submit
        // Such as: custom verification
        // let v1 = document.querySelector("#v1").value;
        // pass = v1 > 0;
        // msg = v1 > 0 ? msg : "v1 is not illegal";

        if (pass) {
            $("NextButton").click();
        } else {
            divError.style.display = "block";
            divError.innerHTML = errorMsg;
            this.removeAttribute("disabled");
        }
    });
});

Qualtrics.SurveyEngine.addOnPageSubmit(function (type) {
    if (type == "next") {
        // TODO: submit transaction
    }
});
