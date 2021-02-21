const start_btn = document.querySelector(".start_btn button");
const rules = document.querySelector(".rules");
const exit_btn = rules.querySelector(".buttons .quit");
const continue_btn = rules.querySelector(".buttons .restart");
const box1 = document.querySelector(".box1");
const results = document.querySelector(".results");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

start_btn.onclick = () => {
  rules.classList.add("activeInfo");
};

exit_btn.onclick = () => {
  rules.classList.remove("activeInfo");
};

continue_btn.onclick = () => {
  rules.classList.remove("activeInfo");
  box1.classList.add("activeQuiz");
  showQuetions(0);
  queCounter(1);
  startTimer(15);
  startTimerLine(0);
};

let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = results.querySelector(".buttons .restart");
const quit_quiz = results.querySelector(".buttons .quit");

restart_quiz.onclick = () => {
  box1.classList.add("activeQuiz");
  results.classList.remove("activeResult");
  timeValue = 15;
  que_count = 0;
  que_numb = 1;
  userScore = 0;
  widthValue = 0;
  showQuetions(que_count);
  queCounter(que_numb);
  clearInterval(counter);
  clearInterval(counterLine);
  startTimer(timeValue);
  startTimerLine(widthValue);
  timeText.textContent = "Time Left";
  next_btn.classList.remove("show");
};
clearInterval(counter);
clearInterval(counterLine);

quit_quiz.onclick = () => {
  window.location.reload();
};

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    que_count++;
    que_numb++;
    showQuetions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    timeText.textContent = "Time Left";
    next_btn.classList.remove("show");
  } else {
    clearInterval(counter);
    clearInterval(counterLine);
    showResult();
  }
};

function showQuetions(index) {
  const que_text = document.querySelector(".que_text");

  let que_tag =
    "<span>" +
    questions[index].numb +
    ". " +
    questions[index].question +
    "</span>";
  let option_tag =
    '<div class="option"><span>' +
    questions[index].options[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[1] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[2] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[3] +
    "</span></div>";
  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;

  const option = option_list.querySelectorAll(".option");

  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);
  let userAns = answer.textContent;
  let correcAns = questions[que_count].answer;
  const allOptions = option_list.children.length;

  if (userAns == correcAns) {
    userScore += 1;
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIconTag);
    console.log("Correct Answer");
    console.log("Your correct answers = " + userScore);
  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIconTag);
    console.log("Wrong Answer");

    for (i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correcAns) {
        option_list.children[i].setAttribute("class", "option correct");
        option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
        console.log("Auto selected correct answer.");
      }
    }
  }
  for (i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  next_btn.classList.add("show");
}

function showResult() {
  rules.classList.remove("activeInfo");
  box1.classList.remove("activeQuiz");
  results.classList.add("activeResult");
  const scoreText = results.querySelector(".score_text");
  if (userScore > 3) {
    let scoreTag =
      "<span> Congratulations! You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else if (userScore > 1) {
    let scoreTag =
      "<span> You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag =
      "<span> You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeText.textContent = "Time Off";
      const allOptions = option_list.children.length;
      let correcAns = questions[que_count].answer;
      for (i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correcAns) {
          option_list.children[i].setAttribute("class", "option correct");
          option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
          console.log("Time Off: Auto selected correct answer.");
        }
      }
      for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
      }
      next_btn.classList.add("show");
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1;
    time_line.style.width = time + "px";
    if (time > 549) {
    }
  }
}

function queCounter(index) {
  let totalQueCounTag =
    "<span><p>" +
    index +
    "</p> of <p>" +
    questions.length +
    "</p> Questions</span>";
  bottom_ques_counter.innerHTML = totalQueCounTag;
}

var stores = ["First Score", "Second Score", "Third Score"];
var inputField = document.getElementById("inputString");

function clearStorage() {
  stores = ["First Score", "Second Score", "Third Score"];
  localStorage.clear("database");
  document.getElementById("write").innerHTML = "storage cleared.";
}

function saveStatusLocally() {
  var stringToSave = inputField.value;
  if (stringToSave == null || stringToSave == "") {
    document.getElementById("write").innerHTML = "nothing to store.";
  } else {
    stores.push(stringToSave);
    inputField.value = "";
    window.localStorage.setItem("database", stores.join(""));
    document.getElementById("write").innerHTML = "data stored.";
    setTimeout(function () {
      document.getElementById("write").innerHTML = "userScore";
    }, 1000);
  }

  let retrievedObject = JSON.parse(window.localStorage.getItem(".score_text"));

  if (!retrievedObject) {
    alert("saved");
    retrievedObject = [];
  }

  retrievedObject.push(".score_text" + retrievedObject.length);
  window.localStorage.setItem(".score_text", JSON.stringify(retrievedObject));
}

function readStatus() {
  if (window.localStorage.getItem("database") == null) {
    document.getElementById("write").innerHTML = "nothing stored.";
  } else {
    document.getElementById("write").innerHTML =
      window.localStorage.getItem("database") +
      "<br>quiz:" +
      window.localStorage.getItem("finalScore");
  }
}

let questions = [
  {
    numb: 1,
    question: "What is the language of the World Wide Web?",
    answer: "HTML",
    options: ["Binary Code", "LINUX", "HTML", "CSS"],
  },
  {
    numb: 2,
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheet",
    options: [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet",
    ],
  },
  {
    numb: 3,
    question: "Who is making the Web standards?",
    answer: "The World Wide Web Consortium",
    options: [
      "Microsoft",
      "Mozilla",
      "The World Wide Web Consortium",
      "Google",
    ],
  },
  {
    numb: 4,
    question:
      "In HTML, which attribute is used to specify that an input field must be filled out?",
    answer: "required",
    options: ["validate", "required", "formvalidate", "placeholder"],
  },
  {
    numb: 5,
    question: "How do you create a function in JavaScript?",
    answer: "function myFunction()",
    options: [
      "function myFunction()",
      "function = myfunction()",
      "function:myFunction()",
      "function (myFunction)",
    ],
  },
  {
    numb: 6,
    question: "How to write an IF statement in JavaScript?",
    answer: "if (i == 5)  ",
    options: ["if i = 5 then", "if (i == 5)", "if i = 5", "if i == 5 then"],
  },
  {
    numb: 7,
    question: "How do you insert a comment in a CSS file?",
    answer: "/* this is a comment */",
    options: [
      "// this is a comment //",
      "// this is a comment",
      "' this is a comment",
      "/* this is a comment */  ",
    ],
  },
  {
    numb: 8,
    question: "What does HTML stand for?",
    answer: "Hyper Text Markup Language",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language",
    ],
  },
  {
    numb: 9,
    question: "Which CSS property controls the text size?",
    answer: "font-size",
    options: ["font-size", "text-size", "font-style", "text-style"],
  },
  {
    numb: 10,
    question: "Which is the correct CSS syntax?",
    answer: "body {color: black;}",
    options: [
      "body {color: black;}",
      "{body:color=black;}",
      "{body;color:black;}",
      "body:color=black;",
    ],
  },
];
