document.addEventListener('DOMContentLoaded', () => {

    // 1. Interactive Dynamic Typing Effect in Hero
    const roles = [
        "BCA Graduate 🎓",
        "Software Testing Aspirant 🐞",
        "AI-Assisted Web Builder ⚡",
        "SQL & Database Enthusiast 📊"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    const typingElement = document.getElementById('typing-text');

    function typeEffect() {
        if (charIndex < roles[roleIndex].length) {
            typingElement.textContent += roles[roleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, 90);
        } else {
            setTimeout(eraseEffect, 1800);
        }
    }

    function eraseEffect() {
        if (charIndex > 0) {
            typingElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseEffect, 50);
        } else {
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeEffect, 300);
        }
    }

    typeEffect();

// 2. QA Game Engine with Modal & Timed Toasts
const launchBtn = document.getElementById('launch-game-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalOverlay = document.getElementById('game-modal-overlay');

const bugBtn = document.getElementById('bug-btn');
const bugStatus = document.getElementById('bug-status');
const gameToast = document.getElementById('game-toast');
const toastMsg = document.getElementById('toast-msg');
const replayBtn = document.getElementById('replay-btn');

const defectLifeCycle = [
    { status: "STATUS: NEW 📝", toast: "Bug Logged in Jira!" },
    { status: "STATUS: ASSIGNED 👨‍💻", toast: "Developer Assigned!" },
    { status: "STATUS: FIXED 🧪", toast: "Code Patched! Run Retest." },
    { status: "STATUS: VERIFIED ✅", toast: "Test Passed! Ready to Close." }
];

let currentStep = 0;
let toastTimeout;

// 1. Open & Close Modal Controls
launchBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'flex';
    resetGame();
});

closeModalBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
});

// 2. Helper Function to Trigger 1.5s Pop-Up Toast
function showToast(text) {
    toastMsg.textContent = text;
    gameToast.classList.add('show');
    
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        gameToast.classList.remove('show');
    }, 1500);
}

// 3. Move Bug inside Arena Bounds
function moveBugInsideArena() {
    const arena = document.querySelector('.game-arena');
    const maxX = arena.clientWidth - 60;
    const maxY = arena.clientHeight - 60;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    bugBtn.style.left = `${randomX}px`;
    bugBtn.style.top = `${randomY}px`;
}

// 4. Bug Click Handler
bugBtn.addEventListener('click', () => {
    if (currentStep < defectLifeCycle.length) {
        bugStatus.textContent = defectLifeCycle[currentStep].status;
        showToast(defectLifeCycle[currentStep].toast);
        moveBugInsideArena();
        currentStep++;
    } else {
        bugStatus.textContent = "STATUS: CLOSED 🏆";
        showToast("Defect Life Cycle Complete! 🎉");
        
        bugBtn.style.transform = 'scale(0) rotate(180deg)';
        setTimeout(() => {
            bugBtn.style.display = 'none';
            replayBtn.style.display = 'inline-block';
        }, 400);
    }
});

// 5. Reset Game Function
function resetGame() {
    currentStep = 0;
    bugBtn.style.display = 'block';
    bugBtn.style.transform = 'scale(1)';
    bugStatus.textContent = "STATUS: OPEN 🐞";
    replayBtn.style.display = 'none';
    gameToast.classList.remove('show');
    moveBugInsideArena();
}

replayBtn.addEventListener('click', resetGame);
});