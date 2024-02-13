// wenn du hier rein schaust findest du die aufloesung:
// geh auf folgende adresse 'philiploebl.online/mj/secret-love.html'
// dann siehst du die 2. seite, von da kommst du auf die 3.
// jetzt musst du nur noch diesen kommentar finden <3

document.addEventListener('DOMContentLoaded', function() {
    // Check for login status only if the password input exists
    if (document.getElementById('password-input')) {
        try {
            if (window.localStorage.getItem('isLoggedIn') === '1') {
                start();
            }
        } catch (e) {
            console.error('Error checking logged in status:', e);
        }
    }
    
    initEventListeners();
});

function checkPassword() {
    try {
        const password = document.getElementById('password-input').value;
        if (password === 'MJ') {
            start();
        } else {
            alert('Wrong password!');
        }
    } catch (e) {
        console.error('Error checking password:', e);
    }
}

function start() {
    // Ensure this runs only if the countdown element exists
    if (document.getElementById('countdown')) {
        try {
            window.localStorage.setItem('isLoggedIn', '1');
            document.getElementById('password-protect').classList.toggle('hidden');
            document.getElementById('countdown').classList.toggle('hidden');
            startCountdown();
        } catch (e) {
            console.error('Error starting application:', e);
        }
    }
}

function startCountdown() {
    // Additional check might not be necessary here since start() already checks
    try {
        const countdownDate = new Date('Feb 13, 2024 24:00:00').getTime();
        const x = setInterval(function () {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            try {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                document.getElementById('days').innerHTML = days;
                document.getElementById('hours').innerHTML = hours;
                document.getElementById('minutes').innerHTML = minutes;
                document.getElementById('seconds').innerHTML = seconds;
            } catch (e) {
                console.error('Error updating countdown:', e);
            }

            if (distance < 0) {
                clearInterval(x);
                window.location.href = './secret-love.html';
            }
        }, 1000);
    } catch (e) {
        console.error('Error setting up countdown:', e);
    }
}

function initEventListeners() {
    // Page-specific initializations
    const loveButtonsExists = document.querySelector('#love-buttons');
    const waitingGifExists = document.getElementById('waiting-gif');

    if (loveButtonsExists) {
        setupLoveButtons();
    }

    if (waitingGifExists) {
        setupGifDisplay();
    }
}

function setupLoveButtons() {
    // Assume this setup is for a page with love-buttons
    try {
        const noButton = document.querySelector('#love-buttons #no');
        const yesButton = document.querySelector('#love-buttons #yes');

        if (noButton && yesButton) {
            setupButtonListeners(noButton, yesButton);
        }
    } catch (e) {
        console.error('Error setting up love buttons:', e);
    }
}

function setupButtonListeners(noButton, yesButton) {
    const scaleFactor = 1.125;
    let curScaleYes = 1;
    let curScaleNo = 1;

    noButton.addEventListener('click', function() {
        try {
            curScaleYes *= scaleFactor;
            curScaleNo /= scaleFactor;
        
            yesButton.style.transform = `scale(${curScaleYes})`;
            noButton.style.transform = `scale(${curScaleNo})`;
        } catch (e) {
            console.error('Error handling No button click:', e);
        }
    });
    
    yesButton.addEventListener('click', () => {
        try {
            window.location.href = './success';
        } catch (e) {
            console.error('Error handling Yes button click:', e);
        }
    });
}

function setupGifDisplay() {
    // Assume this setup is for a page with a waiting GIF
    try {
        const gifs = [
            "./assets/cuddle.gif",
            "./assets/hug.gif",
            "./assets/crush.gif"
        ];
        const img = document.getElementById('waiting-gif');
        img.src = getRandomPath(gifs);
    } catch (e) {
        console.error('Error setting up GIF display:', e);
    }
}

function getRandomPath(gifs) {
    try {
        const randomIndex = Math.floor(Math.random() * gifs.length);
        return gifs[randomIndex];
    } catch (e) {
        console.error('Error getting random GIF path:', e);
        return ''; // Return a default or empty string in case of error
    }
}
