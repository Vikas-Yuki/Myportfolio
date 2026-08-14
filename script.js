document.addEventListener('DOMContentLoaded', () => {

    // 1. Interactive Dynamic Typing Effect in Hero
    const roles = [
        "BCA Graduate",
        "Aspiring QA Engineer",
        " AI assisted web builder",
        "Database Systems & SQL"
    ];

    let roleIndex = 0;
    const typingElement = document.querySelector('.typing-text');

    function changeRole() {
        // Slide current text upward
        typingElement.classList.add('slide-out');

        setTimeout(() => {
            roleIndex = (roleIndex + 1) % roles.length;

            // Change text
            typingElement.textContent = roles[roleIndex];

            // Start from below
            typingElement.classList.remove('slide-out');
            typingElement.classList.add('slide-in');

            setTimeout(() => {
                typingElement.classList.remove('slide-in');
            }, 600);

        }, 600);
    }

    typingElement.textContent = roles[0];
    setInterval(changeRole, 3000);

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
        { status: "STATUS: NEW", toast: "Defect Logged in JIRA System" },
        { status: "STATUS: ASSIGNED", toast: "Assigned to Engineering Lead" },
        { status: "STATUS: FIXED", toast: "Patch Deployed — Retest Required" },
        { status: "STATUS: VERIFIED", toast: "Verification Passed — Ready to Close" }
    ];

    let currentStep = 0;
    let toastTimeout;

    // Open & Close Modal Controls
    launchBtn.addEventListener('click', () => {
        modalOverlay.style.display = 'flex';
        resetGame();
    });

    closeModalBtn.addEventListener('click', () => {
        modalOverlay.style.display = 'none';
    });

    // Helper Function to Trigger Pop-Up Toast
    function showToast(text) {
        toastMsg.textContent = text;
        gameToast.classList.add('show');

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            gameToast.classList.remove('show');
        }, 1500);
    }

    // Move Bug inside Arena Bounds
    function moveBugInsideArena() {
        const arena = document.querySelector('.game-arena');
        const maxX = arena.clientWidth - 60;
        const maxY = arena.clientHeight - 60;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        bugBtn.style.left = `${randomX}px`;
        bugBtn.style.top = `${randomY}px`;
    }

    // Bug Click Handler
    bugBtn.addEventListener('click', () => {
        if (currentStep < defectLifeCycle.length) {
            bugStatus.textContent = defectLifeCycle[currentStep].status;
            showToast(defectLifeCycle[currentStep].toast);
            moveBugInsideArena();
            currentStep++;
        } else {
            bugStatus.textContent = "STATUS: CLOSED";
            showToast("Defect Lifecycle Completed Successfully");

            bugBtn.style.transform = 'scale(0) rotate(180deg)';
            setTimeout(() => {
                bugBtn.style.display = 'none';
                replayBtn.style.display = 'inline-block';
            }, 400);
        }
    });

    // Reset Game Function
    function resetGame() {
        currentStep = 0;
        bugBtn.style.display = 'block';
        bugBtn.style.transform = 'scale(1)';
        bugStatus.textContent = "STATUS: OPEN";
        replayBtn.style.display = 'none';
        gameToast.classList.remove('show');
        moveBugInsideArena();
    }

    replayBtn.addEventListener('click', resetGame);
});

// Auto-close Bootstrap Mobile Navbar when a link is clicked
const navLinks = document.querySelectorAll('.navbar-collapse .nav-link');
const menuCollapse = document.getElementById('navbarNav');

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        if (menuCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(menuCollapse, { toggle: false });
            bsCollapse.hide();
        }
    });
});