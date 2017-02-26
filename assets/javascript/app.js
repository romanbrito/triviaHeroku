// question object

function question(name, answer1, answer1Boolean, answer2, answer2Boolean, answer3, answer3Boolean, answer4, answer4Boolean, rightAnswerExplain) {
    this.name = name;
    this.answers = [
        [answer1, answer1Boolean],
        [answer2, answer2Boolean],
        [answer3, answer3Boolean],
        [answer4, answer4Boolean]
    ];
    this.rightAnswer = rightAnswerExplain;
}
//question1.answers[0][1]
var question1 = new question(
    "What event is triggered when the DOM structure of the page is fully parsed by the browser, and is ready to be operated on?",
    '$("document").ready()', true,
    '$("document").onLoad()', false,
    '$("document").addEventListener()', false,
    '$("document").load()', false,
    "The .ready() method offers a way to run JavaScript code as soon as the page's Document Object Model (DOM) becomes safe to manipulate. This will often be a good time to perform tasks that are needed before the user views or interacts with the page, for example to add event handlers and initialize plugins. When multiple functions are added via successive calls to this method, they run when the DOM is ready in the order in which they are added. As of jQuery 3.0, jQuery ensures that an exception occuring in one handler does not prevent subsequently added handlers from executing."
);

var question2 = new question(
    'This code sets the html content of an element with an ID of "target" to "This is a test" in bold.',
    '$("target").html("<&#98;>This is a test<&#47; &#98;>");', false,
    '$("#target").html("<&#98;>This is a test<&#47; &#98;>");', true,
    '$("#target").html.prepend("<&#98;>This is a test<&#47; &#98;>");', false,
    '$("#target").append("<&#98;>This is a test<&#47; &#98;>");', false,
    "The html() method sets or returns the content (innerHTML) of the selected elements. When the method is used to return content, it returns the content of the FIRST matched element. When the method is used to set content, it overwrites the content of ALL matched elements. Tip: To set or get only the text content of the selected elements, use the text() method."
);

var question3 = new question(
    "Write the code that changes the border of the span elements on the page to a solid 1px green.",
    '$("span").css("border","1px solid green");', true,
    '$("span").setBorder("1px solid green");', false,
    '$("span").border = "1px solid green";', false,
    'span.css("border", "1px solid green");', false,
    "The .css() method is a convenient way to get a computed style property from the first matched element, especially in light of the different ways browsers access most of those properties (the getComputedStyle() method in standards-based browsers versus the currentStyle and runtimeStyle properties in Internet Explorer prior to version 9) and the different terms browsers use for certain properties. For example, Internet Explorer's DOM implementation refers to the float property as styleFloat, while W3C standards-compliant browsers refer to it as cssFloat. For consistency, you can simply use \"float\", and jQuery will translate it to the correct value for each browser."
);

var questions = [question1, question2, question3];

const timeLeftvar = 30;
const timeOutvar = 5000;
var wins = 0;
var loss = 0;
var noAnswer = 0;
// counter
var counter = -1;

$(document).on("click", "#start", generateQuestion);



$(document).on("click", ".answer", function () {
    var dataIndex = $(this).attr("data-index");
    if (questions[counter].answers[dataIndex][1] === true) {
        // stopwatch function
        stopwatch.stop();
        correctAnswer();
    } else {
        //        stopwatch function
        stopwatch.stop();
        wrongAnswer();
    }
});

// functions
function generateQuestion() {
  // end game
  if (counter < questions.length-1) {

    // start timer
    stopwatch.time = timeLeftvar;
    stopwatch.start();

    counter++;
    $("#question").html(questions[counter].name);
    // generate answer buttons
    $(".answerList").empty();
    // removes button after start
    $(".startButton").empty();
    for (var i = 0; i < questions[counter].answers.length; i++) {
        // questions[0].answers.length
        $(".answerList").append("<li class='answer' data-index =" + i + "><a>" + questions[counter].answers[i][0] + "</a></li>");
    }
  } else {
    $("#question").html("Game Over");
    $(".answerList").html("Result");
    $(".answerList").append("<li> Correct " + wins + "</li>");
    $(".answerList").append("<li> Wrong " + loss + "</li>");
    $(".answerList").append("<li> NO Answer " + noAnswer + "</li>");
    // create button and reset
    $(".startButton").html("<button type='button' name='button' class='btn default' id ='start'>Restart</button>");
    wins = 0;
    loss = 0;
    noAnswer = 0;
    // counter
    counter = -1;

  }
};

// wait a few seconds and continue
function correctAnswer() {
    wins++;
    $("#question").html("<h2>Correct Answer</h2>");
    explainAnswer();
}

function wrongAnswer() {
  loss++
    $("#question").html("<h2>Wrong Answer</h2>");
    explainAnswer();
}

function explainAnswer() {
    $(".answerList").empty();
    $(".answerList").html("<p>" + questions[counter].rightAnswer + "</p>");
    console.log(counter);

    setTimeout(generateQuestion, timeOutvar);

}

// stopwatch functions
//  Variable that will hold our setInterval that runs the stopwatch

var intervalId;

// Our stopwatch object
var stopwatch = {

    time: 0,
    lap: 1,

    reset: function () {

        stopwatch.time = 0;
        stopwatch.lap = 1;

        // DONE: Change the "display" div to "00:00."
        $("#display").append("00:00");

        // DONE: Empty the "laps" div.
        $("#laps").html("");
    },
    start: function () {


        // DONE: Use setInterval to start the count here.
        intervalId = setInterval(stopwatch.count, 1000);
    },
    stop: function () {

        // DONE: Use clearInterval to stop the count here.
        clearInterval(intervalId);
    },
    recordLap: function () {

        // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
        //       and save the result in a variable.
        var converted = stopwatch.timeConverter(stopwatch.time);

        // DONE: Add the current lap and time to the "laps" div.
        $("#laps").append("<p>Lap " + stopwatch.lap + " : " + converted + "</p>");

        // DONE: Increment lap by 1. Remember, we can't use "this" here.
        stopwatch.lap++;
    },
    count: function () {

        //modify to count backwards

        // DONE: increment time by 1, remember we cant use "this" here.
        stopwatch.time--;

        // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
        //       and save the result in a variable.
        var converted = stopwatch.timeConverter(stopwatch.time);
        // console.log(converted);
        //  when time is up
        if (converted === "00:00") {
            //console.log("time is up");
            stopwatch.stop();
            noAnswer++;
            $("#question").html("<h2>Time is up</h2>");
            explainAnswer();
        }

        // DONE: Use the variable we just created to show the converted time in the "display" div.
        $("#display").html("Time remaining " + converted);
    },
    timeConverter: function (t) {

        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        } else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    }
};
