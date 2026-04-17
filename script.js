// ==================== GLOBAL STATE & CONFIG ====================
const appState = {
  currentPage: 'home-page',
  currentMode: 'addition',
  practiceSettings: {
    minNum: 10,
    maxNum: 100,
    numQuestions: 10,
    timePerQuestion: 30
  },
  practiceSession: {
    isActive: false,
    currentQuestion: 0,
    correct: 0,
    answered: 0,
    answers: [],
    startTime: 0,
    totalTime: 0,
    questionTimes: []
  },
  arenaSession: {
    isActive: false,
    score: 0,
    correct: 0,
    answered: 0,
    timeRemaining: 60,
    startTime: 0,
    playerName: '',
    answers: []
  },
  abacusState: {
    columns: 5,
    beadsPerColumn: 5,
    state: []
  },
  leaderboardFilter: 'all'
};

// ==================== NAVIGATION ====================

/**
 * Navigate to a specific page
 */
function goToPage(pageName) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });

  // Show selected page
  const page = document.getElementById(pageName);
  if (page) {
    page.classList.add('active');
    appState.currentPage = pageName;
  }

  // Update bottom navigation
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const navBtn = document.querySelector(`[data-page="${pageName}"]`);
  if (navBtn) {
    navBtn.classList.add('active');
  }

  // Initialize page content if needed
  if (pageName === 'leaderboard-page') {
    renderLeaderboard();
  } else if (pageName === 'tool-page') {
    if (document.getElementById('abacusContainer').children.length === 0) {
      createAbacus();
    }
  } else if (pageName === 'home-page') {
    updateHomeStats();
  }
}

/**
 * Update home page statistics
 */
function updateHomeStats() {
  const allScores = getAllScores();
  const totalAttempts = allScores.length;
  
  let bestAccuracy = 0;
  if (allScores.length > 0) {
    bestAccuracy = Math.max(...allScores.map(s => s.accuracy));
  }

  document.getElementById('totalAttempts').innerText = totalAttempts;
  document.getElementById('bestAccuracy').innerText = bestAccuracy.toFixed(1) + '%';
}

// ==================== PRACTICE MODE ====================

/**
 * Select a practice mode
 */
function selectMode(mode) {
  appState.currentMode = mode;
  
  // Update UI
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.mode === mode) {
      btn.classList.add('active');
    }
  });
}

/**
 * Start practice session
 */
function startPractice() {
  // Get settings from inputs
  appState.practiceSettings.minNum = parseInt(document.getElementById('minNum').value) || 10;
  appState.practiceSettings.maxNum = parseInt(document.getElementById('maxNum').value) || 100;
  appState.practiceSettings.numQuestions = parseInt(document.getElementById('numQuestions').value) || 10;
  appState.practiceSettings.timePerQuestion = parseInt(document.getElementById('timePerQuestion').value) || 30;

  // Reset session
  appState.practiceSession = {
    isActive: true,
    currentQuestion: 0,
    correct: 0,
    answered: 0,
    answers: [],
    startTime: Date.now(),
    totalTime: 0,
    questionTimes: []
  };

  // Show practice session UI
  document.getElementById('practice-setup').classList.add('hidden');
  document.getElementById('practice-session').classList.remove('hidden');
  document.getElementById('practice-results').classList.add('hidden');

  // Generate first question
  generatePracticeQuestion();
}

/**
 * Generate a practice question
 */
function generatePracticeQuestion() {
  const { minNum, maxNum, timePerQuestion } = appState.practiceSettings;
  const { currentQuestion, numQuestions } = appState.practiceSession;

  if (currentQuestion >= numQuestions) {
    endPractice();
    return;
  }

  // Generate random numbers
  const a = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
  const b = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

  // Calculate answer based on mode
  let answer, question;
  switch (appState.currentMode) {
    case 'addition':
      answer = a + b;
      question = `${a} + ${b}`;
      break;
    case 'subtraction':
      answer = Math.abs(a - b);
      question = `${Math.max(a, b)} - ${Math.min(a, b)}`;
      break;
    case 'multiplication':
      answer = a * b;
      question = `${a} × ${b}`;
      break;
    case 'division':
      answer = Math.floor(a / b);
      question = `${a * b} ÷ ${b}`;
      break;
  }

  appState.practiceSession.currentQuestion = currentQuestion;
  appState.practiceSession.currentAnswer = answer;
  appState.practiceSession.currentQuestion_text = question;
  appState.practiceSession.questionStartTime = Date.now();

  // Update UI
  document.getElementById('practiceQuestion').innerText = question;
  document.getElementById('practiceAnswer').value = '';
  document.getElementById('practiceAnswer').focus();
  document.getElementById('feedback').classList.add('hidden');

  // Update progress
  const progress = ((currentQuestion + 1) / appState.practiceSettings.numQuestions) * 100;
  document.getElementById('progressFill').style.width = progress + '%';
  document.getElementById('questionCount').innerText = `${currentQuestion + 1}/${appState.practiceSettings.numQuestions}`;

  // Start timer
  startPracticeTimer(timePerQuestion);
}

/**
 * Start timer for practice question
 */
function startPracticeTimer(duration) {
  let timeRemaining = duration;
  document.getElementById('practiceTimer').innerText = timeRemaining + 's';

  // Clear any existing timer
  if (appState.practiceTimerInterval) {
    clearInterval(appState.practiceTimerInterval);
  }

  appState.practiceTimerInterval = setInterval(() => {
    timeRemaining--;
    document.getElementById('practiceTimer').innerText = timeRemaining + 's';

    if (timeRemaining <= 0) {
      clearInterval(appState.practiceTimerInterval);
      // Auto submit with wrong answer
      submitPracticeAnswer(true);
    }
  }, 1000);
}

/**
 * Submit practice answer
 */
function submitPracticeAnswer(autoSubmit = false) {
  clearInterval(appState.practiceTimerInterval);

  const userAnswer = parseInt(document.getElementById('practiceAnswer').value);
  const correctAnswer = appState.practiceSession.currentAnswer;
  const questionTime = (Date.now() - appState.practiceSession.questionStartTime) / 1000;

  appState.practiceSession.answered++;
  appState.practiceSession.questionTimes.push(questionTime);

  const isCorrect = userAnswer === correctAnswer;
  if (isCorrect) {
    appState.practiceSession.correct++;
  }

  appState.practiceSession.answers.push({
    question: appState.practiceSession.currentQuestion_text,
    userAnswer,
    correctAnswer,
    isCorrect,
    time: questionTime
  });

  // Show feedback
  const feedback = document.getElementById('feedback');
  if (isCorrect) {
    feedback.className = 'feedback correct';
    feedback.innerText = '✅ Correct! ' + (autoSubmit ? '(Time\'s up!)' : '');
  } else {
    feedback.className = 'feedback wrong';
    feedback.innerText = `❌ Wrong! The answer was ${correctAnswer}` + (autoSubmit ? ' (Time\'s up!)' : '');
  }
  feedback.classList.remove('hidden');

  // Move to next question after delay
  setTimeout(() => {
    appState.practiceSession.currentQuestion++;
    generatePracticeQuestion();
  }, 1500);
}

/**
 * Handle Enter key in practice answer input
 */
function handleAnswerKey(event) {
  if (event.key === 'Enter') {
    submitPracticeAnswer();
  }
}

/**
 * End practice session
 */
function endPractice() {
  clearInterval(appState.practiceTimerInterval);
  appState.practiceSession.isActive = false;
  appState.practiceSession.totalTime = (Date.now() - appState.practiceSession.startTime) / 1000;

  // Calculate stats
  const { correct, answered } = appState.practiceSession;
  const accuracy = (correct / answered) * 100;
  const avgTime = appState.practiceSession.questionTimes.reduce((a, b) => a + b, 0) / answered;

  // Save score
  const score = {
    mode: appState.currentMode,
    score: correct,
    accuracy: accuracy,
    time: appState.practiceSession.totalTime,
    answers: appState.practiceSession.answers,
    date: new Date().toISOString()
  };
  savePracticeScore(score);

  // Show results
  document.getElementById('practice-setup').classList.add('hidden');
  document.getElementById('practice-session').classList.add('hidden');
  document.getElementById('practice-results').classList.remove('hidden');

  document.getElementById('correctCount').innerText = `${correct}/${answered}`;
  document.getElementById('accuracyPercent').innerText = accuracy.toFixed(1) + '%';
  document.getElementById('avgTime').innerText = avgTime.toFixed(1) + 's';
}

/**
 * Cancel practice session
 */
function cancelPractice() {
  clearInterval(appState.practiceTimerInterval);
  appState.practiceSession.isActive = false;
  
  document.getElementById('practice-setup').classList.remove('hidden');
  document.getElementById('practice-session').classList.add('hidden');
  document.getElementById('practice-results').classList.add('hidden');
}

// ==================== ARENA / COMPETITION MODE ====================

/**
 * Start arena session
 */
function startArena() {
  const playerName = document.getElementById('playerName').value.trim();
  if (!playerName) {
    alert('Please enter your name');
    return;
  }

  appState.arenaSession = {
    isActive: true,
    score: 0,
    correct: 0,
    answered: 0,
    timeRemaining: 60,
    startTime: Date.now(),
    playerName: playerName,
    answers: []
  };

  // Show arena session UI
  document.getElementById('arena-start').classList.add('hidden');
  document.getElementById('arena-session').classList.remove('hidden');
  document.getElementById('arena-results').classList.add('hidden');

  // Generate first question
  generateArenaQuestion();

  // Start countdown timer
  startArenaTimer();
}

/**
 * Generate an arena question
 */
function generateArenaQuestion() {
  if (!appState.arenaSession.isActive) return;

  const minNum = 5;
  const maxNum = 50;

  const a = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
  const b = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

  // Random mode
  const modes = ['addition', 'subtraction', 'multiplication', 'division'];
  const mode = modes[Math.floor(Math.random() * modes.length)];

  let answer, question;
  switch (mode) {
    case 'addition':
      answer = a + b;
      question = `${a} + ${b}`;
      break;
    case 'subtraction':
      answer = Math.abs(a - b);
      question = `${Math.max(a, b)} - ${Math.min(a, b)}`;
      break;
    case 'multiplication':
      answer = a * b;
      question = `${a} × ${b}`;
      break;
    case 'division':
      answer = Math.floor(a / b);
      question = `${a * b} ÷ ${b}`;
      break;
  }

  appState.arenaSession.currentAnswer = answer;
  appState.arenaSession.currentQuestion_text = question;
  appState.arenaSession.questionStartTime = Date.now();

  document.getElementById('arenaQuestion').innerText = question;
  document.getElementById('arenaAnswer').value = '';
  document.getElementById('arenaAnswer').focus();
}

/**
 * Start arena timer (60 second countdown)
 */
function startArenaTimer() {
  let timeRemaining = 60;
  document.getElementById('arenaTimer').innerText = timeRemaining;

  if (appState.arenaTimerInterval) {
    clearInterval(appState.arenaTimerInterval);
  }

  appState.arenaTimerInterval = setInterval(() => {
    timeRemaining--;
    appState.arenaSession.timeRemaining = timeRemaining;
    document.getElementById('arenaTimer').innerText = timeRemaining;

    // Color change as time runs out
    const timerInner = document.getElementById('timerInner');
    if (timeRemaining <= 10) {
      timerInner.style.color = '#ef4444';
    }

    if (timeRemaining <= 0) {
      clearInterval(appState.arenaTimerInterval);
      endArena();
    }
  }, 1000);
}

/**
 * Submit arena answer
 */
function submitArenaAnswer() {
  if (!appState.arenaSession.isActive) return;

  const userAnswer = parseInt(document.getElementById('arenaAnswer').value);
  const correctAnswer = appState.arenaSession.currentAnswer;

  appState.arenaSession.answered++;

  const isCorrect = userAnswer === correctAnswer;
  if (isCorrect) {
    appState.arenaSession.correct++;
    appState.arenaSession.score += 10; // 10 points per correct answer
  }

  appState.arenaSession.answers.push({
    question: appState.arenaSession.currentQuestion_text,
    userAnswer,
    correctAnswer,
    isCorrect
  });

  // Update UI
  document.getElementById('arenaScore').innerText = appState.arenaSession.score;
  document.getElementById('arenaCorrect').innerText = appState.arenaSession.correct;

  // Generate next question
  generateArenaQuestion();
}

/**
 * Handle Enter key in arena answer input
 */
function handleArenaAnswerKey(event) {
  if (event.key === 'Enter') {
    submitArenaAnswer();
  }
}

/**
 * End arena session
 */
function endArena() {
  appState.arenaSession.isActive = false;
  clearInterval(appState.arenaTimerInterval);

  const { score, correct, answered } = appState.arenaSession;
  const accuracy = answered > 0 ? (correct / answered) * 100 : 0;
  const timeTaken = 60 - appState.arenaSession.timeRemaining;

  // Save to leaderboard
  const leaderboardEntry = {
    name: appState.arenaSession.playerName,
    score: score,
    correct: correct,
    answered: answered,
    accuracy: accuracy,
    time: timeTaken,
    mode: 'arena',
    date: new Date().toISOString()
  };
  saveLeaderboardScore(leaderboardEntry);

  // Show results
  document.getElementById('arena-start').classList.add('hidden');
  document.getElementById('arena-session').classList.add('hidden');
  document.getElementById('arena-results').classList.remove('hidden');

  document.getElementById('finalScore').innerText = score;
  document.getElementById('arenaFinalScore').innerText = score;
  document.getElementById('arenaFinalCorrect').innerText = `${correct}/${answered}`;
  document.getElementById('arenaFinalAccuracy').innerText = accuracy.toFixed(1) + '%';
  document.getElementById('arenaTimeTaken').innerText = timeTaken + 's';
}

/**
 * Save arena score to leaderboard
 */
function saveArenaScore() {
  // Already saved in endArena(), just navigate
  goToPage('leaderboard-page');
}

// ==================== LEADERBOARD SYSTEM ====================

/**
 * Save leaderboard score
 */
function saveLeaderboardScore(entry) {
  let leaderboard = getLeaderboard();
  leaderboard.push(entry);
  // Sort by score (descending)
  leaderboard.sort((a, b) => b.score - a.score);
  // Keep only top 100
  leaderboard = leaderboard.slice(0, 100);
  localStorage.setItem('abacus_leaderboard', JSON.stringify(leaderboard));
}

/**
 * Get leaderboard from localStorage
 */
function getLeaderboard() {
  const data = localStorage.getItem('abacus_leaderboard');
  return data ? JSON.parse(data) : [];
}

/**
 * Get all scores (for home page stats)
 */
function getAllScores() {
  return getLeaderboard();
}

/**
 * Save practice score
 */
function savePracticeScore(score) {
  let practiceScores = JSON.parse(localStorage.getItem('abacus_practice') || '[]');
  practiceScores.push(score);
  localStorage.setItem('abacus_practice', JSON.stringify(practiceScores));
}

/**
 * Filter and render leaderboard
 */
function filterLeaderboard(mode) {
  appState.leaderboardFilter = mode;

  // Update filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.filter === mode) {
      btn.classList.add('active');
    }
  });

  renderLeaderboard();
}

/**
 * Render leaderboard
 */
function renderLeaderboard() {
  let leaderboard = getLeaderboard();

  // Filter by mode if needed
  if (appState.leaderboardFilter !== 'all') {
    leaderboard = leaderboard.filter(entry => entry.mode === appState.leaderboardFilter);
  }

  const leaderboardList = document.getElementById('leaderboardList');
  const emptyState = document.getElementById('emptyLeaderboard');

  if (leaderboard.length === 0) {
    leaderboardList.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  leaderboardList.innerHTML = leaderboard.map((entry, index) => `
    <div class="leaderboard-item">
      <div class="leaderboard-rank">#${index + 1}</div>
      <div class="leaderboard-info">
        <div class="leaderboard-name">${escapeHtml(entry.name)}</div>
        <div class="leaderboard-details">
          Accuracy: ${entry.accuracy.toFixed(1)}% | Time: ${entry.time}s
        </div>
      </div>
      <div class="leaderboard-score">${entry.score}</div>
    </div>
  `).join('');
}

// ==================== ABACUS TOOL ====================

/**
 * Create abacus
 */
function createAbacus() {
  const container = document.getElementById('abacusContainer');
  container.innerHTML = '';

  const { columns, beadsPerColumn } = appState.abacusState;
  appState.abacusState.state = Array(columns).fill(0);

  for (let i = 0; i < columns; i++) {
    const column = document.createElement('div');
    column.className = 'abacus-column';
    column.style.position = 'relative';

    for (let j = 0; j < beadsPerColumn; j++) {
      const bead = document.createElement('div');
      bead.className = 'abacus-bead';
      bead.style.top = (j * 40 + 10) + 'px';
      bead.dataset.column = i;
      bead.dataset.position = j;

      bead.onclick = (e) => {
        e.stopPropagation();
        toggleBead(i, j);
      };

      column.appendChild(bead);
    }

    container.appendChild(column);
  }

  updateAbacusDisplay();
}

/**
 * Toggle a bead on the abacus
 */
function toggleBead(columnIndex, beadIndex) {
  const { state, beadsPerColumn } = appState.abacusState;

  // Toggle the bead
  if (state[columnIndex] > beadIndex) {
    state[columnIndex] = beadIndex;
  } else {
    state[columnIndex] = beadIndex + 1;
  }

  updateAbacusDisplay();
}

/**
 * Update abacus display
 */
function updateAbacusDisplay() {
  const { state, beadsPerColumn } = appState.abacusState;
  const beads = document.querySelectorAll('.abacus-bead');

  // Update bead colors and positions
  beads.forEach(bead => {
    const col = parseInt(bead.dataset.column);
    const pos = parseInt(bead.dataset.position);
    const isActive = pos < state[col];

    bead.classList.toggle('active', isActive);
  });

  // Update value display
  updateAbacusValue();
}

/**
 * Update abacus value calculation
 */
function updateAbacusValue() {
  const { state, columns } = appState.abacusState;
  let total = 0;

  for (let i = 0; i < columns; i++) {
    total += state[i] * Math.pow(10, columns - i - 1);
  }

  document.getElementById('abacusValue').innerText = total;
}

/**
 * Reset abacus
 */
function resetAbacus() {
  appState.abacusState.state = Array(appState.abacusState.columns).fill(0);
  updateAbacusDisplay();
}

/**
 * Randomize abacus
 */
function randomizeAbacus() {
  const { columns, beadsPerColumn } = appState.abacusState;
  appState.abacusState.state = Array(columns).fill(0).map(() => Math.floor(Math.random() * (beadsPerColumn + 1)));
  updateAbacusDisplay();
}

// ==================== BACKEND-READY API FUNCTIONS ====================
// These are placeholder functions ready for Google Sheets API integration

/**
 * Save score to backend (Google Sheets API)
 * Placeholder for future implementation
 */
async function saveScoreToBackend(score) {
  try {
    // TODO: Implement Google Sheets API integration
    // This would send score data to a backend service
    console.log('Saving to backend:', score);
    // Example structure for future implementation:
    // const response = await fetch('/api/scores', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(score)
    // });
  } catch (error) {
    console.error('Error saving to backend:', error);
  }
}

/**
 * Fetch leaderboard from backend (Google Sheets API)
 * Placeholder for future implementation
 */
async function fetchLeaderboardFromBackend() {
  try {
    // TODO: Implement Google Sheets API integration
    console.log('Fetching leaderboard from backend');
    // Example structure for future implementation:
    // const response = await fetch('/api/leaderboard');
    // return await response.json();
    return [];
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
}

/**
 * Sync local storage with backend
 * Placeholder for future implementation
 */
async function syncWithBackend() {
  try {
    // TODO: Implement sync logic
    console.log('Syncing with backend...');
    const leaderboard = getLeaderboard();
    // await saveScoreToBackend(leaderboard);
  } catch (error) {
    console.error('Error syncing with backend:', error);
  }
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Escape HTML special characters (security)
 */
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ==================== INITIALIZATION ====================

/**
 * Initialize app on page load
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize abacus if on tool page
  if (document.getElementById('abacusContainer').children.length === 0 && appState.currentPage === 'tool-page') {
    createAbacus();
  }

  // Set initial mode
  selectMode('addition');

  // Load and display leaderboard
  renderLeaderboard();

  // Update home stats
  updateHomeStats();

  // Initialize starting page
  goToPage('home-page');
});

// Log app ready
console.log('Abacus Pro app loaded and ready!');

createAbacus();