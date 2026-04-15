let audioCtx;
let isAudioEnabled = false;
const bgm = document.getElementById('bgm');

bgm.volume = 0.25;

const questionSets = {
    '1': {
        label: 'Kelas 1 SD',
        description: 'Latihan sangat dasar dengan kata pendek yang mudah dikenali.',
        phrases: ['IBU', 'TAS', 'API', 'TOPI', 'BUKU', 'BAJU', 'ROTI', 'BOLA', 'SUSU', 'MEJA']
    },
    '2': {
        label: 'Kelas 2 SD',
        description: 'Mulai memakai kata-kata sederhana yang dekat dengan kegiatan pramuka.',
        phrases: ['TALI', 'SIAGA', 'REGU', 'KEMAH', 'SALAM', 'PATROLI', 'BENDERA', 'BARUNG', 'PRAMUKA', 'PEMBINA']
    },
    '3': {
        label: 'Kelas 3 SD',
        description: 'Tantangan lanjutan dengan frasa pramuka yang lebih panjang.',
        phrases: ['SALAM PRAMUKA', 'REGU SIAGA', 'TALI TEMALI', 'API UNGGUN', 'KEMAH CERIA', 'HORMAT BENDERA', 'BARUNG RAJIN', 'SIAP IKUT KEMAH', 'BELAJAR SANDI ANGKA', 'PRAMUKA PEMBERANI']
    }
};

let currentLevelIndex = 0;
let flippedCount = 0;
let totalLetters = 0;
let selectedGrade = null;
const guideRows = [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'],
    ['U', 'V', 'W', 'X', 'Y', 'Z']
];

function getActiveSet() {
    return questionSets[selectedGrade];
}

function buildGuideMarkup() {
    const rowsMarkup = guideRows
        .map((row) => {
            const rowClass = row.length === 10 ? 'ten' : 'six';
            const cells = row
                .map((letter) => {
                    const number = letter.charCodeAt(0) - 64;
                    return (
                        '<div class="guide-cell">' +
                            '<span class="guide-letter">' + letter + '</span>' +
                            '<span class="guide-number">' + number + '</span>' +
                        '</div>'
                    );
                })
                .join('');

            return '<div class="guide-row ' + rowClass + '">' + cells + '</div>';
        })
        .join('');

    return (
        '<div class="guide-board">' +
            '<h3 class="guide-title">Sandi Angka</h3>' +
            '<div class="guide-grid">' + rowsMarkup + '</div>' +
        '</div>'
    );
}

function renderGuideCharts() {
    const inlineGuideChart = document.getElementById('inline-guide-chart');
    const gradeGuideChart = document.getElementById('grade-guide-chart');
    const markup = buildGuideMarkup();

    inlineGuideChart.innerHTML = markup;
    gradeGuideChart.innerHTML = markup;
}

function updateGuideVisibility() {
    const inlineGuideWrapper = document.getElementById('inline-guide-wrapper');
    if (selectedGrade === '1' || selectedGrade === '2') {
        inlineGuideWrapper.classList.remove('hidden');
    } else {
        inlineGuideWrapper.classList.add('hidden');
    }
}

function selectGrade(grade) {
    selectedGrade = grade;
    const activeSet = getActiveSet();
    const selectedGradeText = document.getElementById('selected-grade-text');
    const videoGradeNote = document.getElementById('video-grade-note');
    const currentGradeLabel = document.getElementById('current-grade-label');
    const startButton = document.getElementById('btn-start-game');

    document.querySelectorAll('.grade-card').forEach((card) => {
        const isActive = card.dataset.grade === grade;
        card.classList.toggle('active', isActive);
    });

    selectedGradeText.innerText = activeSet.label + ': ' + activeSet.description;
    videoGradeNote.innerText = 'Mode belajar: ' + activeSet.label;
    currentGradeLabel.innerText = activeSet.label + ' - ' + activeSet.description;
    startButton.disabled = false;
    updateGuideVisibility();
}

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function toggleAudio() {
    isAudioEnabled = !isAudioEnabled;
    const icon = document.getElementById('audio-icon');
    if (isAudioEnabled) {
        initAudio();
        bgm.play().catch((error) => console.log('Gagal memutar BGM:', error));
        icon.innerText = '🔊';
        playClick();
    } else {
        bgm.pause();
        icon.innerText = '🔇';
    }
}

function playTone(freq, type, duration, volume = 0.1) {
    if (!isAudioEnabled || !audioCtx) {
        return;
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(volume, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

function playClick() {
    playTone(800, 'triangle', 0.05, 0.05);
}

function playFlip() {
    playTone(600, 'sine', 0.1, 0.1);
    setTimeout(() => playTone(900, 'sine', 0.1, 0.1), 50);
}

function playSuccess() {
    playTone(440, 'square', 0.1, 0.05);
    setTimeout(() => playTone(554, 'square', 0.1, 0.05), 100);
    setTimeout(() => playTone(659, 'square', 0.3, 0.05), 200);
}

function playWin() {
    playSuccess();
    setTimeout(() => playSuccess(), 400);
    setTimeout(() => playTone(880, 'square', 0.5, 0.05), 800);
}

function charToNumber(char) {
    if (char === ' ') {
        return ' ';
    }
    return char.charCodeAt(0) - 64;
}

function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach((element) => {
        element.classList.remove('active');
    });

    setTimeout(() => {
        document.getElementById(screenId).classList.add('active');
    }, 50);
}

function toggleKey() {
    playClick();
    const modal = document.getElementById('key-modal');
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    } else {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function showInstruction() {
    playClick();
    const modal = document.getElementById('instruction-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function hideInstruction() {
    playClick();
    const modal = document.getElementById('instruction-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function startGame() {
    if (!selectedGrade) {
        return;
    }

    if (!audioCtx) {
        initAudio();
    }
    playClick();

    bgm.pause();
    document.getElementById('audio-icon').innerText = '🔇';
    isAudioEnabled = false;

    showScreen('screen-video');
}

function proceedToGame() {
    if (!selectedGrade) {
        return;
    }

    playClick();

    const iframe = document.getElementById('youtube-video');
    if (iframe) {
        iframe.src = iframe.src;
    }

    isAudioEnabled = true;
    document.getElementById('audio-icon').innerText = '🔊';
    bgm.play().catch((error) => console.log('Gagal memutar BGM:', error));

    const activeSet = getActiveSet();
    currentLevelIndex = 0;
    document.getElementById('level-badge').classList.remove('hidden');
    document.getElementById('level-badge').classList.add('inline-flex');
    document.getElementById('current-grade-label').innerText = activeSet.label + ' - ' + activeSet.description;
    updateGuideVisibility();

    if (selectedGrade === '3') {
        showScreen('screen-grade-guide');
        return;
    }

    renderLevel();
}

function continueToQuestions() {
    playClick();
    renderLevel();
}

function renderLevel() {
    const activeSet = getActiveSet();
    const currentPhrase = activeSet.phrases[currentLevelIndex];
    const words = currentPhrase.split(' ');
    const container = document.getElementById('board-container');

    container.innerHTML = '';
    document.getElementById('game-title').innerText = 'Pesan Sandi #' + (currentLevelIndex + 1);
    document.getElementById('level-badge').innerText = 'Misi ' + (currentLevelIndex + 1) + '/' + activeSet.phrases.length;

    flippedCount = 0;
    totalLetters = 0;
    document.getElementById('btn-finish').classList.add('hidden');
    document.getElementById('btn-finish').classList.remove('flex');

    const boardRow = document.createElement('div');
    boardRow.className = 'flex flex-wrap justify-center gap-x-12 gap-y-10';

    words.forEach((word) => {
        const wordGroup = document.createElement('div');
        wordGroup.className = 'flex gap-3 bg-white px-6 py-5 rounded-2xl border border-slate-200 shadow-sm relative';

        for (let index = 0; index < word.length; index += 1) {
            const char = word[index].toUpperCase();
            totalLetters += 1;

            const letterCol = document.createElement('div');
            letterCol.className = 'flex flex-col items-center gap-3';

            const hintDiv = document.createElement('div');
            hintDiv.className = 'text-2xl font-black text-slate-500 bg-slate-100 px-4 py-1.5 rounded-md border border-slate-200 shadow-sm';
            hintDiv.innerText = charToNumber(char);

            const cardDiv = document.createElement('div');
            cardDiv.className = 'flip-card';
            cardDiv.onclick = function () {
                flipCard(this);
            };

            const cardInner = document.createElement('div');
            cardInner.className = 'flip-card-inner';

            const cardFront = document.createElement('div');
            cardFront.className = 'flip-card-front';
            cardFront.innerHTML = '<span class="opacity-70">?</span>';

            const cardBack = document.createElement('div');
            cardBack.className = 'flip-card-back';
            cardBack.innerText = char;

            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            cardDiv.appendChild(cardInner);

            letterCol.appendChild(hintDiv);
            letterCol.appendChild(cardDiv);
            wordGroup.appendChild(letterCol);
        }

        boardRow.appendChild(wordGroup);
    });

    container.appendChild(boardRow);
    showScreen('screen-game');
}

function flipCard(cardElement) {
    if (cardElement.classList.contains('flipped')) {
        return;
    }

    playFlip();
    cardElement.classList.add('flipped');
    flippedCount += 1;
    checkCompletion();
}

function revealAll() {
    playClick();
    const cards = document.querySelectorAll('.flip-card:not(.flipped)');
    cards.forEach((card) => {
        card.classList.add('flipped');
        flippedCount += 1;
    });
    checkCompletion();
}

function checkCompletion() {
    if (flippedCount === totalLetters) {
        const finishButton = document.getElementById('btn-finish');
        finishButton.classList.remove('hidden');
        finishButton.classList.add('flex');
    }
}

function finishLevel() {
    const activeSet = getActiveSet();

    if (currentLevelIndex < activeSet.phrases.length - 1) {
        playSuccess();
        document.getElementById('level-message').innerText = activeSet.phrases[currentLevelIndex];
        showScreen('screen-intermission');
    } else {
        playWin();
        showScreen('screen-success');
        document.getElementById('level-badge').classList.add('hidden');
        document.getElementById('level-badge').classList.remove('inline-flex');
    }
}

function nextLevel() {
    playClick();
    currentLevelIndex += 1;
    renderLevel();
}

function resetGame() {
    playClick();
    currentLevelIndex = 0;
    document.getElementById('level-badge').classList.add('hidden');
    document.getElementById('level-badge').classList.remove('inline-flex');
    showScreen('screen-start');
}

renderGuideCharts();
