// ========== 1. QUIZ QUESTIONS DATASET ARRAY ==========
const quizData = [
  { q: "Which programming language is predominantly used for browser behavior automation?", a: ["Python", "Java", "JavaScript", "C++"], c: 2 },
  { q: "What does CSS stand for in web engineering?", a: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Complex Style System"], c: 1 },
  { q: "Which HTML5 element is used to encapsulate principal structural navigation links?", a: ["<section>", "<nav>", "<links>", "<header>"], c: 1 },
  { q: "What is the primary function of a semantic layout grid engine?", a: ["Database indexing", "Visual distribution formatting", "Server lifecycle control", "Network socket mapping"], c: 1 },
  { q: "Which HTTP status code represents an unauthorized client authentication resource fault?", a: ["200 OK", "404 Not Found", "401 Unauthorized", "500 Internal Error"], c: 2 },
  { q: "In JavaScript async workflows, what does a Promise represent?", a: ["An active execution loop", "An eventual completion of asynchronous block", "A strict constant reference", "An intentional memory leak mapping"], c: 1 },
  { q: "Which relational property defines an item stack alignment inside a CSS Flex container vertical axis?", a: ["align-items", "justify-content", "flex-direction", "grid-template"], c: 0 },
  { q: "What is the default tracking mechanism context of the document local storage engine?", a: ["Session transient scope", "Persistent cross-session baseline", "Encrypted middleware token", "Server pipeline safe stack"], c: 1 },
  { q: "Which character operator handles strict type identity evaluation inside JavaScript engines?", a: ["=", "==", "===", "!"], c: 2 },
  { q: "What does API stand for in software integration logic architecture?", a: ["Automated Parameter Interface", "Application Programming Interface", "Array Processing Instruction", "Abstract Pattern Integration"], c: 1 }
];

// ========== 2. SYSTEM STATE TRACKERS ==========
let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timerInterval = null;
let timeLeft = 30;

// DOM Selectors
const quizMain = document.getElementById('quizMain');
const resultsScreen = document.getElementById('resultsScreen');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const nextBtn = document.getElementById('nextBtn');
const questionNumText = document.getElementById('questionNum');
const scoreTrackerText = document.getElementById('scoreTracker');
const progressBarFill = document.getElementById('progressBarFill');
const timerText = document.getElementById('timerText');

// ========== 3. ENGINE LOOPS & SHUFFLE SYSTEM ==========
function startQuiz() {
  resultsScreen.classList.add('hidden');
  quizMain.classList.remove('hidden');
  score = 0;
  currentQuestionIndex = 0;
  scoreTrackerText.innerText = `Score: ${score}`;
  
  // Custom Shuffle Utility
  shuffledQuestions = [...quizData].sort(() => Math.random() - 0.5);
  loadNextQuestion();
}

function loadNextQuestion() {
  resetTimer();
  nextBtn.classList.add('hidden');
  optionsContainer.innerHTML = '';

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  questionText.innerText = currentQuestion.q;
  
  // Progress indicators updates
  questionNumText.innerText = `Question ${currentQuestionIndex + 1} of 10`;
  progressBarFill.style.width = `${((currentQuestionIndex + 1) / 10) * 100}%`;

  // Option items generation loop
  currentQuestion.a.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.innerText = option;
    button.onclick = () => selectOption(button, index);
    optionsContainer.appendChild(button);
  });

  startTimer();
}

// ========== 4. INTERACTION VALIDATION & SELECTION ==========
function selectOption(selectedBtn, selectedIdx) {
  clearInterval(timerInterval);
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const correctIdx = currentQuestion.c;
  
  const allButtons = optionsContainer.querySelectorAll('.option-btn');
  allButtons.forEach(btn => btn.disabled = true); // Prevent double clicking

  if (selectedIdx === correctIdx) {
    selectedBtn.classList.add('correct');
    score++;
    scoreTrackerText.innerText = `Score: ${score}`;
  } else {
    selectedBtn.classList.add('wrong');
    allButtons[correctIdx].classList.add('correct'); // Highlight answer
  }

  revealNextController();
}

function revealNextController() {
  if (currentQuestionIndex < 9) {
    nextBtn.classList.remove('hidden');
  } else {
    setTimeout(showFinalMetricsSummary, 1200);
  }
}

// ========== 5. TIMERS LIFECYCLE MANAGERS ==========
function startTimer() {
  timeLeft = 30;
  timerText.innerText = `${timeLeft}s`;
  
  timerInterval = setInterval(() => {
    timeLeft--;
    timerText.innerText = `${timeLeft}s`;
    
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeoutAction();
    }
  }, 1000);
}

function handleTimeoutAction() {
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const correctIdx = currentQuestion.c;
  const allButtons = optionsContainer.querySelectorAll('.option-btn');
  
  allButtons.forEach(btn => btn.disabled = true);
  allButtons[correctIdx].classList.add('correct'); // Show actual right choice

  revealNextController();
}

function resetTimer() {
  clearInterval(timerInterval);
}

// ========== 6. METRICS ANALYSIS RESULTS PAGE ==========
function showFinalMetricsSummary() {
  quizMain.classList.add('hidden');
  resultsScreen.classList.remove('hidden');
  
  const percentage = (score / 10) * 100;
  document.getElementById('finalScore').innerText = score;
  document.getElementById('finalPercentage').innerText = `${percentage}%`;
  
  const iconContainer = document.getElementById('resultIcon');
  const heading = document.getElementById('resultHeading');
  const textMsg = document.getElementById('resultMessage');

  if (percentage >= 70) {
    iconContainer.className = "status-icon-box pass";
    iconContainer.innerHTML = `<i class="fas fa-check-circle"></i>`;
    heading.innerText = "Assessment Passed";
    textMsg.innerText = "Excellent data synthesis capabilities. Your core technological metrics verify advanced profile engineering standard synchronization capacity.";
  } else {
    iconContainer.className = "status-icon-box fail";
    iconContainer.innerHTML = `<i class="fas fa-times-circle"></i>`;
    heading.innerText = "Review Needed";
    textMsg.innerText = "Baseline metrics dropped below parameters. Consider structural system study review modules before triggering validation re-attempts.";
  }
}

// Global Operations Configuration Listeners
nextBtn.onclick = () => {
  currentQuestionIndex++;
  loadNextQuestion();
};

document.getElementById('restartBtn').onclick = startQuiz;
window.addEventListener('DOMContentLoaded', startQuiz);