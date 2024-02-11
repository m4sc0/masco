// Define the Konami Code sequence
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

// Index to keep track of the current position in the Konami Code sequence
let konamiCodeIndex = 0;

// Function to check if the Konami Code was entered correctly
function checkKonamiCode(event) {
    // Get the key pressed
    const key = event.key;

    // Check if the key pressed matches the next key in the Konami Code sequence
    if (key === konamiCode[konamiCodeIndex]) {
        konamiCodeIndex++;

        movePage(event);

        // If the entire Konami Code sequence was entered correctly
        if (konamiCodeIndex === konamiCode.length) {
            // Reset the index for future input
            konamiCodeIndex = 0;

            window.location.href = '/mj/secret-love.html';
        }
    } else {
        // If the pressed key is incorrect, reset the index
        konamiCodeIndex = 0;
    }
}

// Add event listener to listen for keydown events
document.addEventListener('keydown', checkKonamiCode);

// Function to move the page according to the key pressed
function movePage(event) {
    // Get the key pressed
    const key = event.key;

    // Define translation values
    let translateX = 0;
    let translateY = 0;

    // Set translation values based on the key pressed
    switch(key) {
        case 'ArrowUp':
            translateY = -50;
            break;
        case 'ArrowDown':
            translateY = 50;
            break;
        case 'ArrowLeft':
            translateX = -50;
            break;
        case 'ArrowRight':
            translateX = 50;
            break;
        default:
            // Do nothing if a non-arrow key is pressed
            return;
    }

    // Translate the page
    document.body.style.transition = 'transform 0.1s ease';
    document.body.style.transform = `translate(${translateX}px, ${translateY}px)`;

    // Reset the translation after a short delay
    setTimeout(() => {
        document.body.style.transition = 'none';
        document.body.style.transform = 'translate(0, 0)';
    }, 100);
}