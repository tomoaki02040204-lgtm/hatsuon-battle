const PRACTICE_WORDS = [
  { word: "Apple", ipa: "/ˈæpəl/" },
  { word: "Book", ipa: "/bʊk/" },
  { word: "Cat", ipa: "/kæt/" },
  { word: "Dog", ipa: "/dɔɡ/" },
  { word: "Sun", ipa: "/sʌn/" },
  { word: "House", ipa: "/haʊs/" },
  { word: "Happy", ipa: "/ˈhæpi/" },
  { word: "Milk", ipa: "/mɪlk/" },
  { word: "Friend", ipa: "/frɛnd/" },
  { word: "School", ipa: "/skuːl/" },
  { word: "Mother", ipa: "/ˈmʌðər/" },
  { word: "Orange", ipa: "/ˈɔrɪndʒ/" },
  { word: "Family", ipa: "/ˈfæməli/" },
  { word: "Beautiful", ipa: "/ˈbjuːtɪfəl/" },
  { word: "Computer", ipa: "/kəmˈpjuːtər/" },
  { word: "Morning", ipa: "/ˈmɔrnɪŋ/" },
  { word: "Music", ipa: "/ˈmjuːzɪk/" },
  { word: "Yellow", ipa: "/ˈjɛloʊ/" },
  { word: "Teacher", ipa: "/ˈtiːtʃər/" },
  { word: "Water", ipa: "/ˈwɔtər/" },
];

const JAPANESE_WORDS = [
  { word: "りんご", reading: "りんご", ipa: "/ɾiŋɡo/" },
  { word: "水", reading: "みず", ipa: "/mʲizɯ/" },
  { word: "猫", reading: "ねこ", ipa: "/neko/" },
  { word: "犬", reading: "いぬ", ipa: "/inɯ/" },
  { word: "本", reading: "ほん", ipa: "/hoɴ/" },
  { word: "花", reading: "はな", ipa: "/hana/" },
  { word: "山", reading: "やま", ipa: "/jama/" },
  { word: "川", reading: "かわ", ipa: "/kawa/" },
  { word: "空", reading: "そら", ipa: "/soɾa/" },
  { word: "雨", reading: "あめ", ipa: "/ame/" },
  { word: "傘", reading: "かさ", ipa: "/kasa/" },
  { word: "車", reading: "くるま", ipa: "/kɯɾɯma/" },
  { word: "電車", reading: "でんしゃ", ipa: "/deɴɕa/" },
  { word: "学校", reading: "がっこう", ipa: "/ɡakːoː/" },
  { word: "先生", reading: "せんせい", ipa: "/seɴseː/" },
  { word: "友達", reading: "ともだち", ipa: "/tomodatɕi/" },
  { word: "家", reading: "いえ", ipa: "/ie/" },
  { word: "母", reading: "はは", ipa: "/haha/" },
  { word: "父", reading: "ちち", ipa: "/tɕitɕi/" },
  { word: "子ども", reading: "こども", ipa: "/kodomo/", accepted: ["子供"] },
  { word: "食べる", reading: "たべる", ipa: "/tabeɾɯ/" },
  { word: "飲む", reading: "のむ", ipa: "/nomɯ/" },
  { word: "こんにちは", reading: "こんにちは", ipa: "/koɴɲitɕiwa/" },
  { word: "ありがとう", reading: "ありがとう", ipa: "/aɾiɡatoː/" },
  { word: "おはよう", reading: "おはよう", ipa: "/ohajoː/", accepted: ["お早う"] },
  { word: "赤", reading: "あか", ipa: "/aka/" },
  { word: "白", reading: "しろ", ipa: "/ɕiɾo/" },
  { word: "大きい", reading: "おおきい", ipa: "/oːkiː/" },
  { word: "小さい", reading: "ちいさい", ipa: "/tɕiːsai/" },
  { word: "好き", reading: "すき", ipa: "/sɯki/" },
];

const TOTAL_QUESTIONS = 10;
const POINTS_PER_CORRECT_ANSWER = 100;
const HIGH_SCORE_KEYS = {
  en: "hatsuon-battle-high-score",
  ja: "hatsuon-battle-high-score-ja",
};
const LANGUAGE_STORAGE_KEY = "hatsuon-battle-language";
const WORD_BANKS = { en: PRACTICE_WORDS, ja: JAPANESE_WORDS };
const UI_STRINGS = {
  en: {
    pageTitle: "Pronunciation Battle",
    pageDescription: "A 10-question pronunciation game in English and Japanese.",
    homeLabel: "Pronunciation Battle home",
    languageGroup: "Quiz language",
    englishLanguage: "🇺🇸 English",
    japaneseLanguage: "🇯🇵 Japanese",
    switchToEnglish: "Switch to English",
    switchToJapanese: "Switch to Japanese",
    startEyebrow: "Speak up and play",
    startTitle: "10-question challenge",
    startDescriptionEnglish: "Say 10 English words into the microphone.",
    startDescriptionJapanese: "Say 10 Japanese words into the microphone.",
    randomQuestions: "10 random questions",
    pointsEach: "100 points each",
    startButton: "Start Challenge",
    todayChallenge: "Today's Challenge",
    totalScore: "Total Score",
    pointsUnit: "points",
    challengeProgress: "Challenge Progress",
    questionCount: "10 Questions",
    questionCountSuffix: " questions",
    questionProgress: (current, total) => `Question ${current} of ${total}`,
    sayWord: "Say this word aloud",
    waitingForWord: "Waiting for a word",
    micPrompt: "Tap the microphone and say the word",
    startMic: "Start",
    retryButton: "Try Again",
    retryPrompt: "Tap Try Again to speak again.",
    answeredButton: "Done",
    answerChecked: "Answer checked. Continue to the next question.",
    stop: "Stop",
    listening: "Listening...",
    privacy: "The microphone is used only when you tap the button.",
    yourPronunciation: "Your Pronunciation",
    ready: "Ready",
    recognizedPlaceholder: "Your recognized word will appear here.",
    recognizedPrefix: "Recognized: ",
    reading: (value) => `Reading: ${value}`,
    tryAgainResult: "Let's try that again",
    excellent: "Excellent!",
    incorrect: "Incorrect",
    correctStatus: (points) => `Correct! ${points} points`,
    incorrectStatus: (points) => `Incorrect — ${points} points`,
    correctFeedback: "Great pronunciation!",
    incorrectFeedback: (word) => `Listen for “${word}” and try again next round.`,
    retryAvailable: "You can try again.",
    nextQuestion: "Next Question",
    challengeComplete: "Challenge complete",
    summaryTitle: "10 questions—well done!",
    summaryIntro: "Every time you speak, your pronunciation gets stronger.",
    finalScore: "Final Score",
    correctAnswers: "Correct Answers",
    correctCount: (count, total) => `${count} / ${total} questions`,
    practiceWords: "Practice these words",
    wordsToPractice: "Words to Practice",
    perfectRun: "No missed words. Perfect round!",
    bestScore: "Best Score",
    tryAgain: "Try Again",
    footer: "Every attempt helps you improve.",
    recordPronunciation: "Record pronunciation",
    stopRecognition: "Stop recognition",
    speechUnavailable: "Speech recognition is unavailable in this browser",
    unsupportedStatus: "Speech recognition is not supported.",
    unsupportedInstruction: "Speech recognition isn't available in this browser.",
    permissionMessage: "Microphone access is blocked. Check your browser settings and try again.",
    permissionStatus: "Microphone unavailable",
    noSpeechMessage: "Speak into the microphone and try again.",
    noSpeechStatus: "No speech detected",
    noSpeechRecognized: "Speech could not be recognized.",
    audioMessage: "No microphone was found. Check your connection and settings.",
    audioStatus: "Check your microphone",
    stoppedMessage: "Recognition stopped. Tap the microphone to try again.",
    stoppedStatus: "Recognition stopped",
    recognitionErrorMessage: "Speech recognition failed. Check your connection or microphone and try again.",
    recognitionErrorStatus: "Speech not recognized",
    startFailureMessage: "Wait a moment, then try again.",
    startFailureStatus: "Couldn't start speech recognition",
    endFailureMessage: "Speak into the microphone and try again.",
    endFailureStatus: "Speech was not recognized",
    timeoutMessage: "Recognition took too long. Tap Try Again to make another attempt.",
    timeoutStatus: "Recognition timed out",
  },
  ja: {
    pageTitle: "発音バトル",
    pageDescription: "英語と日本語の単語を、マイクに向かって発音する10問チャレンジ。",
    homeLabel: "発音バトル ホーム",
    languageGroup: "出題言語",
    englishLanguage: "🇺🇸 英語",
    japaneseLanguage: "🇯🇵 日本語",
    switchToEnglish: "英語に切り替え",
    switchToJapanese: "日本語に切り替え",
    startEyebrow: "声に出してチャレンジ",
    startTitle: "10問チャレンジ",
    startDescriptionEnglish: "英語の単語を10問、マイクに向かって発音しよう。",
    startDescriptionJapanese: "日本語の単語を10問、マイクに向かって発音しよう。",
    randomQuestions: "ランダム出題",
    pointsEach: "1問 100点",
    startButton: "チャレンジを始める",
    todayChallenge: "今日のチャレンジ",
    totalScore: "累計得点",
    pointsUnit: "点",
    challengeProgress: "チャレンジの進み具合",
    questionCount: "全10問",
    questionCountSuffix: "問",
    questionProgress: (current, total) => `第${current}問 / ${total}問`,
    sayWord: "この単語を声に出してみよう",
    waitingForWord: "出題を待っています",
    micPrompt: "マイクを押して、発音してみよう",
    startMic: "話す",
    retryButton: "もう一度話す",
    retryPrompt: "もう一度話すボタンを押してください。",
    answeredButton: "判定済み",
    answerChecked: "判定しました。次の問題へ進んでください。",
    stop: "停止",
    listening: "聞き取り中...",
    privacy: "ボタンを押した時だけマイクを使います",
    yourPronunciation: "あなたの発音",
    ready: "準備できています",
    recognizedPlaceholder: "ここに認識した言葉が表示されます",
    recognizedPrefix: "認識: ",
    reading: (value) => `読み: ${value}`,
    tryAgainResult: "もう一度ためしてみよう",
    excellent: "すばらしい！",
    incorrect: "不正解",
    correctStatus: (points) => `正解！ ${points}点`,
    incorrectStatus: (points) => `不正解 ${points}点`,
    correctFeedback: "きれいに発音できました",
    incorrectFeedback: (word) => `「${word}」を聞き取れるように、次の問題でまた挑戦しよう。`,
    retryAvailable: "もう一度挑戦できます",
    nextQuestion: "次の問題へ",
    challengeComplete: "チャレンジ完了",
    summaryTitle: "10問、おつかれさま！",
    summaryIntro: "声に出したぶんだけ、発音が育っています。",
    finalScore: "今回の合計得点",
    correctAnswers: "正解した問題",
    correctCount: (count, total) => `${count} / ${total}問`,
    practiceWords: "もう一度練習しよう",
    wordsToPractice: "まちがえた単語",
    perfectRun: "まちがえた単語はありません。全問正解です！",
    bestScore: "これまでの最高得点",
    tryAgain: "もう一度挑戦",
    footer: "まちがえても大丈夫。声に出すたび、上手になる。",
    recordPronunciation: "発音を録音する",
    stopRecognition: "認識を停止する",
    speechUnavailable: "このブラウザでは音声認識を利用できません",
    unsupportedStatus: "音声認識に対応していません",
    unsupportedInstruction: "このブラウザでは音声認識を利用できません",
    permissionMessage: "マイクの使用が許可されていません。ブラウザの設定を確認して、もう一度お試しください。",
    permissionStatus: "マイクを使えません",
    noSpeechMessage: "マイクに向かって、もう一度話してみてください。",
    noSpeechStatus: "声が聞こえませんでした",
    noSpeechRecognized: "音声を認識できませんでした",
    audioMessage: "マイクが見つかりません。接続や設定を確認してください。",
    audioStatus: "マイクを確認してください",
    stoppedMessage: "認識を停止しました。もう一度マイクを押して挑戦できます。",
    stoppedStatus: "認識を停止しました",
    recognitionErrorMessage: "音声認識に失敗しました。接続やマイクの状態を確認して、もう一度お試しください。",
    recognitionErrorStatus: "音声を認識できませんでした",
    startFailureMessage: "少し待ってから、もう一度お試しください。",
    startFailureStatus: "音声認識を開始できません",
    endFailureMessage: "マイクに向かって、もう一度話してみてください。",
    endFailureStatus: "声が認識されませんでした",
    timeoutMessage: "音声認識に時間がかかりすぎました。もう一度話してください。",
    timeoutStatus: "音声認識がタイムアウトしました",
  },
};

function readSavedLanguage() {
  try {
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) === "ja" ? "ja" : "en";
  } catch {
    return "en";
  }
}

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const startPanel = document.querySelector("#start-panel");
const startButton = document.querySelector("#start-button");
const startDescription = document.querySelector("#start-description");
const pageDescription = document.querySelector('meta[name="description"]');
const languageSwitch = document.querySelector("#language-switch");
const languageButtons = document.querySelectorAll(".language-button");
const brand = document.querySelector(".brand");
const brandName = document.querySelector("#brand-name");
const startEyebrow = document.querySelector("#start-eyebrow");
const startTitle = document.querySelector("#start-title");
const randomQuestionsLabel = document.querySelector("#random-questions-label");
const pointsEachLabel = document.querySelector("#points-each-label");
const startButtonLabel = document.querySelector("#start-button-label");
const gamePanel = document.querySelector("#game-panel");
const summaryPanel = document.querySelector("#summary-panel");
const roundNumber = document.querySelector("#round-number");
const progressTrack = document.querySelector("#progress-track");
const progressFill = document.querySelector("#progress-fill");
const roundScore = document.querySelector("#round-score");
const roundScoreContainer = document.querySelector("#round-score-container");
const challengeLabel = document.querySelector("#challenge-label");
const totalScoreLabel = document.querySelector("#total-score-label");
const roundScoreUnit = document.querySelector("#round-score-unit");
const progressCaption = document.querySelector("#progress-caption");
const progressTotal = document.querySelector("#progress-total");
const promptEyebrow = document.querySelector("#prompt-eyebrow");
const gameTitle = document.querySelector("#game-title");
const reading = document.querySelector("#reading");
const phonetic = document.querySelector("#phonetic");
const micButton = document.querySelector("#mic-button");
const buttonLabel = document.querySelector("#button-label");
const instruction = document.querySelector("#instruction");
const privacyLabel = document.querySelector("#privacy-label");
const statusMessage = document.querySelector("#status-message");
const resultCard = document.querySelector("#result-card");
const resultLabel = document.querySelector("#result-label");
const recognizedText = document.querySelector("#recognized-text");
const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-button");
const nextButtonLabel = document.querySelector("#next-button-label");
const finalScore = document.querySelector("#final-score");
const finalScoreLabel = document.querySelector("#final-score-label");
const finalScoreUnit = document.querySelector("#final-score-unit");
const correctCountDisplay = document.querySelector("#correct-count");
const correctCountLabel = document.querySelector("#correct-count-label");
const correctCountTotal = document.querySelector("#correct-count-total");
const summaryKickerLabel = document.querySelector("#summary-kicker-label");
const summaryTitle = document.querySelector("#summary-title");
const summaryIntro = document.querySelector("#summary-intro");
const practiceWordsHeading = document.querySelector("#practice-words-heading");
const wordsToPracticeLabel = document.querySelector("#words-to-practice-label");
const mistakeList = document.querySelector("#mistake-list");
const highScoreDisplay = document.querySelector("#high-score");
const bestScoreLabel = document.querySelector("#best-score-label");
const highScoreUnit = document.querySelector("#high-score-unit");
const restartButton = document.querySelector("#restart-button");
const restartButtonLabel = document.querySelector("#restart-button-label");
const footerCopy = document.querySelector("#footer-copy");

let recognition = null;
let isListening = false;
let hasJudged = false;
let roundWords = [];
let roundIndex = 0;
let score = 0;
let correctCount = 0;
let mistakes = [];
let selectedLanguage = readSavedLanguage();
let roundLanguage = selectedLanguage;
let isRoundActive = false;
let recognitionTimeout = null;

const RECOGNITION_TIMEOUT_MS = 15_000;

function clearRecognitionTimeout() {
  if (recognitionTimeout !== null) {
    window.clearTimeout(recognitionTimeout);
    recognitionTimeout = null;
  }
}

function setStatus(message) {
  statusMessage.textContent = message;
}

function t(key, ...values) {
  const entry = UI_STRINGS[selectedLanguage][key];
  return typeof entry === "function" ? entry(...values) : entry;
}

function applyTranslations() {
  const language = UI_STRINGS[selectedLanguage];
  document.documentElement.lang = selectedLanguage;
  document.title = language.pageTitle;
  pageDescription.setAttribute("content", language.pageDescription);
  brand.setAttribute("aria-label", language.homeLabel);
  brandName.textContent = language.pageTitle;
  languageSwitch.setAttribute("aria-label", language.languageGroup);
  languageButtons.forEach((button) => {
    const isEnglishOption = button.dataset.language === "en";
    button.textContent = isEnglishOption
      ? language.englishLanguage
      : language.japaneseLanguage;
    button.setAttribute(
      "aria-label",
      isEnglishOption ? language.switchToEnglish : language.switchToJapanese,
    );
  });

  startEyebrow.textContent = language.startEyebrow;
  startTitle.textContent = language.startTitle;
  startDescription.textContent =
    selectedLanguage === "ja"
      ? language.startDescriptionJapanese
      : language.startDescriptionEnglish;
  const guideLines = selectedLanguage === "ja"
    ? ["遊び方", "① マイクをタップ", "② 表示された単語を発音", "③ 自動で結果を判定"]
    : ["How to play", "① Tap the microphone", "② Say the word shown", "③ Get your result automatically"];
  ["guide-heading", "guide-step-1", "guide-step-2", "guide-step-3"].forEach((id, index) => {
    document.getElementById(id).textContent = guideLines[index];
  });
  randomQuestionsLabel.textContent = language.randomQuestions;
  pointsEachLabel.textContent = language.pointsEach;
  startButtonLabel.textContent = language.startButton;

  challengeLabel.textContent = language.todayChallenge;
  totalScoreLabel.textContent = language.totalScore;
  roundScoreUnit.textContent = language.pointsUnit;
  roundScoreContainer.setAttribute("aria-label", language.totalScore);
  progressCaption.textContent = language.challengeProgress;
  progressTotal.textContent = language.questionCount;
  promptEyebrow.textContent = language.sayWord;
  gameTitle.textContent = language.waitingForWord;
  reading.textContent = "";
  phonetic.textContent = language.waitingForWord;
  recognizedText.textContent = language.recognizedPlaceholder;
  privacyLabel.textContent = language.privacy;
  resultLabel.textContent = language.yourPronunciation;
  setStatus(language.ready);
  buttonLabel.textContent = language.startMic;
  instruction.textContent = language.micPrompt;
  nextButtonLabel.textContent = language.nextQuestion;

  summaryKickerLabel.textContent = language.challengeComplete;
  summaryTitle.textContent = language.summaryTitle;
  summaryIntro.textContent = language.summaryIntro;
  finalScoreLabel.textContent = language.finalScore;
  finalScoreUnit.textContent = language.pointsUnit;
  correctCountDisplay.textContent = "0";
  correctCountLabel.textContent = language.correctAnswers;
  correctCountTotal.textContent = ` / ${TOTAL_QUESTIONS}${language.questionCountSuffix}`;
  practiceWordsHeading.textContent = language.practiceWords;
  wordsToPracticeLabel.textContent = language.wordsToPractice;
  mistakeList.setAttribute("aria-label", language.wordsToPractice);
  bestScoreLabel.textContent = language.bestScore;
  highScoreUnit.textContent = language.pointsUnit;
  restartButtonLabel.textContent = language.tryAgain;
  footerCopy.textContent = language.footer;
  updateProgress();
}

function updateLanguageSelection() {
  const canSelectLanguage = !isRoundActive && !startPanel.hidden;
  languageButtons.forEach((button) => {
    const isSelected = button.dataset.language === selectedLanguage;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
    button.disabled = !canSelectLanguage;
  });
  applyTranslations();
}

function setIdleButton() {
  isListening = false;
  gamePanel.classList.remove("is-listening");
  micButton.classList.remove("is-listening");
  micButton.disabled = !SpeechRecognition || hasJudged;
  micButton.setAttribute("aria-pressed", "false");
  micButton.setAttribute(
    "aria-label",
    SpeechRecognition ? t("recordPronunciation") : t("speechUnavailable"),
  );
  micButton.dataset.testid = "button-start-recognition";
  buttonLabel.textContent = t("startMic");
  instruction.textContent = t("micPrompt");
}

function setRetryButton() {
  setIdleButton();
  buttonLabel.textContent = t("retryButton");
  instruction.textContent = t("retryPrompt");
  micButton.setAttribute("aria-label", t("retryButton"));
}

function setListeningButton() {
  isListening = true;
  micButton.disabled = true;
  micButton.classList.add("is-listening");
  gamePanel.classList.add("is-listening");
  micButton.setAttribute("aria-pressed", "true");
  micButton.setAttribute("aria-label", t("listening"));
  micButton.dataset.testid = "button-listening";
  buttonLabel.textContent = t("listening");
  instruction.textContent = t("listening");
}

function normalizeSpeech(value) {
  return value
    .toLocaleLowerCase("en-US")
    .trim()
    .replace(/^[\s\p{P}\p{S}]+|[\s\p{P}\p{S}]+$/gu, "");
}

function normalizeJapaneseSpeech(value) {
  return Array.from(value.normalize("NFKC").trim(), (character) => {
    const codePoint = character.codePointAt(0);
    return codePoint >= 0x30a1 && codePoint <= 0x30f6
      ? String.fromCodePoint(codePoint - 0x60)
      : character;
  })
    .join("")
    .replace(/[\s\p{P}\p{S}]/gu, "");
}

function matchesAnswer(transcript, question) {
  if (roundLanguage === "en") {
    return normalizeSpeech(transcript) === normalizeSpeech(question.word);
  }

  const normalizedTranscript = normalizeJapaneseSpeech(transcript);
  const acceptedAnswers = [
    question.word,
    question.reading,
    ...(question.accepted ?? []),
  ];
  return acceptedAnswers.some(
    (answer) => normalizeJapaneseSpeech(answer) === normalizedTranscript,
  );
}

function shuffleWords(words) {
  const shuffled = [...words];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }
  return shuffled.slice(0, TOTAL_QUESTIONS);
}

function updateProgress() {
  const currentQuestion = roundIndex + 1;
  roundNumber.textContent = String(currentQuestion).padStart(2, "0");
  progressTrack.setAttribute("aria-label", t("questionProgress", currentQuestion, TOTAL_QUESTIONS));
  progressTrack.setAttribute("aria-valuenow", String(currentQuestion));
  progressFill.style.width = `${(currentQuestion / TOTAL_QUESTIONS) * 100}%`;
  roundScore.textContent = String(score);
}

function showQuestion() {
  const question = roundWords[roundIndex];
  hasJudged = false;
  gamePanel.dataset.language = roundLanguage;
  nextButton.hidden = true;
  gameTitle.textContent = question.word;
  reading.hidden = roundLanguage !== "ja";
  reading.textContent = roundLanguage === "ja" ? t("reading", question.reading) : "";
  phonetic.hidden = !question.ipa;
  phonetic.textContent = question.ipa ?? "";
  recognizedText.textContent = t("recognizedPlaceholder");
  resultCard.dataset.state = "idle";
  resultLabel.textContent = t("yourPronunciation");
  setStatus(t("ready"));
  feedback.textContent = "";
  updateProgress();
  setIdleButton();
  if (!SpeechRecognition) {
    micButton.classList.add("is-unavailable");
    setStatus(t("unsupportedStatus"));
    instruction.textContent = t("unsupportedInstruction");
  }
}

function showRetry(message, status = t("retryAvailable")) {
  resultCard.dataset.state = "error";
  resultLabel.textContent = t("tryAgainResult");
  setStatus(status);
  feedback.textContent = message;
  setRetryButton();
}

function judgeAnswer(transcript) {
  if (hasJudged) return;
  hasJudged = true;
  clearRecognitionTimeout();
  const completedRecognition = recognition;
  recognition = null;
  if (completedRecognition) {
    try {
      completedRecognition.abort();
    } catch {
      // A completed recognition session may no longer be abortable.
    }
  }
  const question = roundWords[roundIndex];
  const isCorrect = matchesAnswer(transcript, question);

  if (isCorrect) {
    score += POINTS_PER_CORRECT_ANSWER;
    correctCount += 1;
    resultCard.dataset.state = "correct";
    resultLabel.textContent = t("excellent");
    setStatus(t("correctStatus", POINTS_PER_CORRECT_ANSWER));
    feedback.textContent = t("correctFeedback");
  } else {
    mistakes.push({
      word: question.word,
      reading: question.reading,
      ipa: question.ipa,
      recognized: transcript,
    });
    resultCard.dataset.state = "retry";
    resultLabel.textContent = t("incorrect");
    setStatus(t("incorrectStatus", 0));
    feedback.textContent = t("incorrectFeedback", question.word);
  }

  recognizedText.textContent = transcript;
  roundScore.textContent = String(score);
  nextButton.hidden = false;
  setIdleButton();
  buttonLabel.textContent = t("answeredButton");
  instruction.textContent = t("answerChecked");
  micButton.setAttribute("aria-label", t("answeredButton"));
}

function readHighScore(key) {
  try {
    const savedScore = Number(window.localStorage.getItem(key));
    return Number.isFinite(savedScore) && savedScore >= 0 ? savedScore : 0;
  } catch {
    return 0;
  }
}

function renderMistakes() {
  mistakeList.replaceChildren();

  if (mistakes.length === 0) {
    const perfectRun = document.createElement("li");
    perfectRun.className = "mistake-empty";
    perfectRun.textContent = t("perfectRun");
    mistakeList.append(perfectRun);
    return;
  }

  for (const mistake of mistakes) {
    const item = document.createElement("div");
    item.className = "mistake-item";
    item.setAttribute("role", "listitem");
    const word = document.createElement("strong");
    word.textContent = mistake.word;
    if (roundLanguage === "ja" && mistake.reading) {
      const pronunciation = document.createElement("span");
      pronunciation.textContent = t("reading", mistake.reading);
      item.append(word, pronunciation);
    } else {
      item.append(word);
    }
    if (mistake.ipa) {
      const ipa = document.createElement("span");
      ipa.textContent = mistake.ipa;
      item.append(ipa);
    }
    const heard = document.createElement("span");
    heard.className = "mistake-heard";
    heard.textContent = `${t("recognizedPrefix")}${mistake.recognized}`;
    item.append(heard);
    mistakeList.append(item);
  }
}

function finishRound() {
  gamePanel.hidden = true;
  summaryPanel.hidden = false;
  finalScore.textContent = String(score);
  correctCountDisplay.textContent = String(correctCount);
  renderMistakes();

  const highScoreKey = HIGH_SCORE_KEYS[roundLanguage];
  const bestScore = Math.max(score, readHighScore(highScoreKey));
  try {
    window.localStorage.setItem(highScoreKey, String(bestScore));
  } catch {
    // The round remains playable even when browser storage is unavailable.
  }
  highScoreDisplay.textContent = String(bestScore);
}

function advanceQuestion() {
  if (!hasJudged) return;

  nextButton.hidden = true;
  if (roundIndex === TOTAL_QUESTIONS - 1) {
    finishRound();
    return;
  }

  roundIndex += 1;
  showQuestion();
}

function startNewRound() {
  clearRecognitionTimeout();
  if (recognition) {
    const previousRecognition = recognition;
    recognition = null;
    try {
      previousRecognition.abort();
    } catch {
      // A completed recognition session may no longer be abortable.
    }
  }

  roundLanguage = selectedLanguage;
  isRoundActive = true;
  roundWords = shuffleWords(WORD_BANKS[roundLanguage]);
  roundIndex = 0;
  score = 0;
  correctCount = 0;
  mistakes = [];
  isListening = false;
  hasJudged = false;
  startPanel.hidden = true;
  summaryPanel.hidden = true;
  gamePanel.hidden = false;
  updateLanguageSelection();
  showQuestion();
}

function returnToSetup() {
  clearRecognitionTimeout();
  if (recognition) {
    const previousRecognition = recognition;
    recognition = null;
    try {
      previousRecognition.abort();
    } catch {
      // A completed recognition session may no longer be abortable.
    }
  }
  isListening = false;
  hasJudged = false;
  isRoundActive = false;
  gamePanel.hidden = true;
  summaryPanel.hidden = true;
  startPanel.hidden = false;
  updateLanguageSelection();
}

function handleRecognitionError(error) {
  if (hasJudged) return;

  if (error === "not-allowed" || error === "service-not-allowed") {
    showRetry(t("permissionMessage"), t("permissionStatus"));
  } else if (error === "no-speech") {
    recognizedText.textContent = t("noSpeechRecognized");
    showRetry(t("noSpeechMessage"), t("noSpeechStatus"));
  } else if (error === "audio-capture") {
    showRetry(t("audioMessage"), t("audioStatus"));
  } else if (error === "aborted") {
    showRetry(t("stoppedMessage"), t("stoppedStatus"));
  } else {
    showRetry(t("recognitionErrorMessage"), t("recognitionErrorStatus"));
  }
}

function startRecognition() {
  if (!SpeechRecognition || hasJudged || isListening) return;

  const activeRecognition = new SpeechRecognition();
  recognition = activeRecognition;
  activeRecognition.lang = roundLanguage === "ja" ? "ja-JP" : "en-US";
  activeRecognition.interimResults = true;
  activeRecognition.continuous = false;
  activeRecognition.maxAlternatives = 1;

  resultCard.dataset.state = "listening";
  resultLabel.textContent = t("yourPronunciation");
  recognizedText.textContent = t("listening");
  feedback.textContent = "";
  setStatus(t("listening"));
  setListeningButton();

  activeRecognition.onresult = (event) => {
    if (recognition !== activeRecognition || hasJudged) return;
    const result = event.results[event.results.length - 1];
    const transcript = result && result[0] ? result[0].transcript : "";
    if (!transcript.trim()) return;

    recognizedText.textContent = transcript;
    if (result.isFinal) {
      judgeAnswer(transcript);
    }
  };

  activeRecognition.onspeechend = () => {
    if (recognition !== activeRecognition || hasJudged) return;
    try {
      activeRecognition.stop();
    } catch {
      // Some implementations stop automatically when speech ends.
    }
  };

  activeRecognition.onerror = (event) => {
    if (recognition !== activeRecognition) return;
    recognition = null;
    clearRecognitionTimeout();
    handleRecognitionError(event.error);
  };

  activeRecognition.onend = () => {
    if (recognition !== activeRecognition) return;
    recognition = null;
    clearRecognitionTimeout();
    if (hasJudged) {
      setIdleButton();
      return;
    }
    if (isListening) {
      recognizedText.textContent = t("noSpeechRecognized");
      showRetry(t("endFailureMessage"), t("endFailureStatus"));
    } else {
      setIdleButton();
    }
  };

  try {
    activeRecognition.start();
    recognitionTimeout = window.setTimeout(() => {
      if (recognition !== activeRecognition || hasJudged) return;
      recognition = null;
      clearRecognitionTimeout();
      try {
        activeRecognition.abort();
      } catch {
        // A hung or completed recognition session may no longer be abortable.
      }
      recognizedText.textContent = t("noSpeechRecognized");
      showRetry(t("timeoutMessage"), t("timeoutStatus"));
    }, RECOGNITION_TIMEOUT_MS);
  } catch {
    recognition = null;
    clearRecognitionTimeout();
    showRetry(t("startFailureMessage"), t("startFailureStatus"));
  }
}

micButton.addEventListener("click", startRecognition);
nextButton.addEventListener("click", advanceQuestion);
startButton.addEventListener("click", startNewRound);
restartButton.addEventListener("click", returnToSetup);
languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (isRoundActive || startPanel.hidden) return;
    selectedLanguage = button.dataset.language;
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, selectedLanguage);
    } catch {
      // Language switching still works for this visit when storage is unavailable.
    }
    updateLanguageSelection();
  });
});

updateLanguageSelection();
