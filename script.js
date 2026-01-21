const quizData = [
  {q:"What force occurs when one object rubs against another object?",c:["Buoyant","Gravity","Friction","Magnetic"],a:2},
  {q:"Which example shows static friction?",c:["Rolling ball","Playing a kite","Flowing water","Book on a table"],a:3},
  {q:"Which surface provides LEAST friction?",c:["Tiled floor","Grass land","Sandy road","Wood floor"],a:0},
  {q:"How do we stop a moving bicycle?",c:["Release the brake pedal","Look at the brake pedal","Press the brake pedal","Do nothing"],a:2},
  {q:"Which bike will run faster?",c:["Mountain bike without brake","Heavy mountain bike","Road bike with wide tires","Road bike with thin tires"],a:3},
  {q:"What happens to kinetic friction when speed increases?",c:["Gets stronger","Stays the same","Stops","Gets weaker"],a:1},
  {q:"Which statement about gravity is TRUE?",c:["Only small objects","Only not moving","Increases with distance","Affects all objects"],a:3},
  {q:"Which has strongest gravity?",c:["Baby","Rice sack","Glass","Elephant"],a:3},
  {q:"Why is it harder to go up a mountain?",c:["Against gravity","Wind","Toward gravity","None"],a:0},
  {q:"Which is NOT gravity effect?",c:["Farther weaker","Pushes upward","Closer stronger","Farther less weight"],a:1}
];

// Duplicate to reach 50 (keeps logic simple)
while (quizData.length < 50) {
  quizData.push(...quizData.slice(0, 50 - quizData.length));
}

quizData.sort(() => Math.random() - 0.5);

let index = 0, score = 0, time = 20, timer;

const question = document.getElementById("question");
const choices = document.getElementById("choices");
const nextBtn = document.getElementById("next-btn");
const result = document.getElementById("result");
const count = document.getElementById("question-count");
const timerDisplay = document.getElementById("timer");

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const finishSound = document.getElementById("finishSound");

function startTimer() {
  clearInterval(timer);
  time = 20;
  timerDisplay.textContent = `⏱ ${time}`;
  timer = setInterval(() => {
    time--;
    timerDisplay.textContent = `⏱ ${time}`;
    if (time === 0) {
      clearInterval(timer);
      nextBtn.disabled = false;
    }
  }, 1000);
}

function loadQuestion() {
  startTimer();
  nextBtn.disabled = true;
  choices.innerHTML = "";
  count.textContent = `Question ${index + 1} / 50`;
  question.textContent = quizData[index].q;

  quizData[index].c.forEach((choice, i) => {
    const div = document.createElement("div");
    div.className = "choice";
    div.textContent = choice;
    div.onclick = () => selectAnswer(div, i);
    choices.appendChild(div);
  });
}

function selectAnswer(el, i) {
  clearInterval(timer);
  document.querySelectorAll(".choice").forEach(c => c.onclick = null);
  if (i === quizData[index].a) {
    el.classList.add("correct");
    correctSound.play();
    score++;
  } else {
    el.classList.add("wrong");
    choices.children[quizData[index].a].classList.add("correct");
    wrongSound.play();
  }
  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  index++;
  index < 50 ? loadQuestion() : showResult();
};

function showResult() {
  finishSound.play();
  document.getElementById("quiz-box").classList.add("hidden");
  result.classList.remove("hidden");
  result.innerHTML = `
    <h2>🎉 Quiz Complete!</h2>
    <h3>Your Score: ${score} / 50</h3>
    <p>${score >= 40 ? "Excellent!" : score >= 30 ? "Good job!" : "Keep practicing!"}</p>
    <button onclick="location.reload()">🔁 Retry Quiz</button>
  `;
}

loadQuestion();
