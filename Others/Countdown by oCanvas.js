// The ID of the target canvas in html
const CanvasID = "#canvas";

// unit: s
const Duration = 20;

// The number of digits after the decimal point
const Accuracy = 1;

// 'true': One turn in a second;
// 'false': Only one turn of the whole time
const CircleSec = true;

const oCanvasCdn =
    "https://cdnjs.cloudflare.com/ajax/libs/ocanvas/2.10.1/ocanvas.min.js";

var questionContainer;
Qualtrics.SurveyEngine.addOnload(function () {
    questionContainer = $(this.getQuestionContainer());

    let scriptTag = document.createElement("script");
    scriptTag.src = oCanvasCdn;
    scriptTag.onload = onLoad;
    scriptTag.onreadystatechange = onLoad;
    questionContainer.appendChild(scriptTag);

    function onLoad() {
        var canvas = oCanvas.create({
            canvas: CanvasID,
            fps: 60,
        });

        var position = {
            x: canvas.width / 2,
            y: canvas.height / 2,
        };

        var arc = canvas.display.arc({
            x: position.x,
            y: position.y,
            radius: 60,
            start: 0,
            end: 360,
            rotation: -90,
            stroke: "10px #079",
            pieSection: false,
        });

        var timeText = canvas.display.text({
            x: position.x,
            y: position.y,
            origin: { x: "center", y: "center" },
            font: "50px",
            text: "20",
            fill: "#079",
        });

        canvas.addChild(arc);
        canvas.addChild(timeText);

        var timeout = Duration * 1000,
            realTime = timeout;
        var Calibration = setInterval(function () {
            realTime = realTime - 100;
            if (timeout > realTime) timeout = realTime;
        }, 100);

        canvas.setLoop(function () {
            arc.start = arc.start + 6;
            timeout = timeout - 1000 / 60;
            timeText.text = timeout.toFixed(Accuracy);
            if (timeout <= 0) {
                canvas.timeline.stop();
                clearInterval(Calibration);
            }
        });

        canvas.timeline.start();
    }
});
